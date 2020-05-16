import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {

  @Output() lang = new EventEmitter();
  private language = 'english';

  constructor(private actionSheetController: ActionSheetController) { }

  ngOnInit() { }

  async presentActionSheetForLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      mode: 'ios',
      buttons: [{
        text: 'Arabic',
        handler: () => {
          this.language = 'ar';
          this.lang.emit('ar');
        }
      }, {
        text: 'English',
        handler: () => {
          this.language = 'en';
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
