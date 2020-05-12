import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private language = 'english';
  public color: string;

  constructor(private actionSheetController: ActionSheetController, private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.color.subscribe(color => {
      this.color = color;
    });
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

  async presentActionSheetForChangingTheme() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Themes',
      mode: 'ios',
      buttons: [{
        text: 'Tertiary',
        handler: () => {
          this.themeService.changeTheme('tertiary-theme');
          this.themeService.color.next('#5260ff');
        }
      }, {
        text: 'Green',
        handler: () => {
          this.themeService.changeTheme('green-theme');
          this.themeService.color.next('#69bb7bff');
        }
      },
      {
        text: 'Red',
        handler: () => {
          this.themeService.changeTheme('red-theme');
          this.themeService.color.next('#eb445a');
        }
      },
      {
        text: 'Blue',
        handler: () => {
          this.themeService.changeTheme('blue-theme');
          this.themeService.color.next('#3880ff');
        }
      },
      {
        text: 'Dark',
        handler: () => {
          this.themeService.changeTheme('dark-theme');
          this.themeService.color.next('#222428');
        }
      }]
    });
    await actionSheet.present();
  }

  changeTheme(theme) {
    this.themeService.changeTheme(theme);
  }
}
