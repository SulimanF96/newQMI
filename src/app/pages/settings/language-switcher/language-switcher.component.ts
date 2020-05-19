import { TranslationService } from './../../../shared/services/translation.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {

  @Output() lang = new EventEmitter();

  constructor(private actionSheetController: ActionSheetController, private translationService: TranslationService, private translateService: TranslateService) { }

  ngOnInit() { }

  async presentActionSheetForLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('SETTINGS.LANGUAGE'),
      mode: 'ios',
      buttons: [{
        text: 'العربية',
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
        text: this.translateService.instant('CANCEL'),
        cssClass: 'red',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

}
