import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private language = 'english';

  constructor(private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async presentActionSheetForLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      buttons: [{
        text: 'Arabic',
        handler: () => {
          this.language = 'arabic';
        }
      }, {
        text: 'English',
        handler: () => {
          this.language = 'english';
        }
      }]
    });
    await actionSheet.present();
  }
}
