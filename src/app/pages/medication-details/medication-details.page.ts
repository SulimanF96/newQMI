import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './../../shared/services/translation.service';
import { MedicationService } from '../../shared/services/medication.service';
import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Medication } from '../../models/medication-details';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.page.html',
  styleUrls: ['./medication-details.page.scss'],
})
export class MedicationDetailsPage implements OnInit {

  public medicationName: string;
  private medicationID: string;
  public dataStatus = 'loading';
  public medicationDetails: Medication;
  public language = 'en';
  private pdfObject = null;

  constructor(private route: ActivatedRoute,
              private medicationService: MedicationService,
              private translationService: TranslationService,
              private file: File,
              private fileOpener: FileOpener,
              private platform: Platform,
              private toastController: ToastController,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.translationService.language$.subscribe(language => {
      this.language = language;
    });
    this.route.params.subscribe(params => {
      this.medicationName = params['medicationName'];
      this.medicationID = params['medicationID'];
    });
    this.medicationID === 'null' ? this.serachForMedicationWithName(this.medicationName) : this.serachForMedicationWithID(this.medicationID);
  }

  serachForMedicationWithName(medicationName: string) {
    if (!this.isArabic(medicationName)) {
      this.medicationService.searchForMedicationWithName(medicationName).then((medicationDetails) => {
        if (medicationDetails.val() != null) {
          medicationDetails.forEach((medicationDetails) => {
            this.medicationDetails = medicationDetails.val();
          });
          this.dataStatus = 'found';
        } else {
          this.dataStatus = 'not found';
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.medicationService.searchForMedicationWithArabicName(medicationName).then((medicationDetails) => {
        if (medicationDetails.val() != null) {
          medicationDetails.forEach((medicationDetails) => {
            this.medicationDetails = medicationDetails.val();
          });
          this.dataStatus = 'found';
        } else {
          this.dataStatus = 'not found';
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  serachForMedicationWithID(medicationID: string) {
    this.medicationService.searchForMedicationWithID(medicationID).then((medicationDetails) => {
      if (medicationDetails.val() != null) {
        medicationDetails.forEach((medicationDetails) => {
          this.medicationDetails = medicationDetails.val();
        });
        this.dataStatus = 'found';
      } else {
        this.dataStatus = 'not found';
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  createPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = {
      content: [
        { text: 'Medication Name', style: 'subheader' },
        { text: this.medicationDetails.name },
        { text: 'Active Component', style: 'subheader' },
        { text: this.medicationDetails.ActiveComponent },
        { text: 'Alternative', style: 'subheader' },
        { text: this.medicationDetails.Alternative },
        { text: 'Price', style: 'subheader' },
        { text: this.medicationDetails.Price },
        { text: 'Describtion', style: 'subheader' },
        { text: this.medicationDetails.Description, style: 'story', margin: [0, 20, 0, 20] },
        { text: 'Before you take it', style: 'subheader' },
        { text: this.medicationDetails.Contradiction, style: 'story', margin: [0, 20, 0, 20] },
        { text: 'Side Effect', style: 'subheader' },
        { text: this.medicationDetails.SideEffect, style: 'story', margin: [0, 20, 0, 20] },
        { text: 'How to take it', style: 'subheader' },
        { text: this.medicationDetails.Dosage, style: 'story', margin: [0, 20, 0, 20] },
        { text: 'What does it contain', style: 'subheader' },
        { text: this.medicationDetails.ingredients, style: 'story', margin: [0, 20, 0, 20] },
        { text: 'How to store it', style: 'subheader' },
        { text: this.medicationDetails.Storage, style: 'story', margin: [0, 20, 0, 20] },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    };
    this.pdfObject = pdfMake.createPdf(docDefinition);
    if (this.platform.is('cordova')) {
      this.pdfObject.getBuffer((buffer) => {
        const blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.externalRootDirectory, this.medicationDetails.name + '.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.externalRootDirectory + this.medicationDetails.name + '.pdf', 'application/pdf');
        })
      });
      this.presentToastFileSaved();
    } else {
      this.pdfObject.download();
    }
  }

  async presentToastFileSaved() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('MEDICATION_DETAILS.DOWNLOAD_MESSAGE'),
      duration: 300
    });
    toast.present();
  }


  searchAgain() {
    this.dataStatus = 'loading';
    setTimeout(() => {
      this.medicationID === 'null' ? this.serachForMedicationWithName(this.medicationName) : this.serachForMedicationWithID(this.medicationID);
    }, 500);
  }

  doRefresh(event) {
    this.dataStatus = 'loading';
    setTimeout(() => {
      this.medicationID === 'null' ? this.serachForMedicationWithName(this.medicationName) : this.serachForMedicationWithID(this.medicationID);
      event.target.complete();
    }, 500);
  }

  isArabic(text) {
    const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
    const result = pattern.test(text);
    return result;
  }
}
