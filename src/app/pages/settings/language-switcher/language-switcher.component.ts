import { TranslationService } from './../../../shared/services/translation.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {

  @Output() lang = new EventEmitter();

  constructor(private actionSheetController: ActionSheetController, private translationService: TranslationService) { }

  ngOnInit() { }

  async presentActionSheetForLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      mode: 'ios',
      buttons: [{
        text: 'Arabic',
        handler: () => {
          this.translationService.switchLanguage('ar');
          this.lang.emit('ar');
        }
      }, {
        text: 'English',
        handler: () => {
          this.translationService.switchLanguage('en');
          this.lang.emit('en');
        }
      }, {
        text: 'Cancel',
        cssClass: 'red',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

}
