import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {

  @Output() color = new EventEmitter();

  constructor(private actionSheetController: ActionSheetController, private themeService: ThemeService,) { }

  ngOnInit() {}

  async presentActionSheetForChangingTheme() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Themes',
      mode: 'ios',
      buttons: [{
        text: 'Tertiary',
        cssClass: 'tertiary',
        handler: () => {
          this.themeService.changeTheme('tertiary-theme');
          this.themeService.color.next('#5260ff');
          this.color.emit('#5260ff');
        }
      }, {
        text: 'Green',
        cssClass: 'green',
        handler: () => {
          this.themeService.changeTheme('green-theme');
          this.themeService.color.next('#69bb7bff');
          this.color.emit('#69bb7bff');
        }
      },
      {
        text: 'Red',
        cssClass: 'red',
        handler: () => {
          this.themeService.changeTheme('red-theme');
          this.themeService.color.next('#eb445a');
          this.color.emit('#eb445a');
        }
      },
      {
        text: 'Blue',
        cssClass: 'blue',
        handler: () => {
          this.themeService.changeTheme('blue-theme');
          this.themeService.color.next('#3880ff');
          this.color.emit('#3880ff');
        }
      },
      {
        text: 'Dark',
        cssClass: 'dark',
        handler: () => {
          this.themeService.changeTheme('dark-theme');
          this.themeService.color.next('#222428');
          this.color.emit('#222428');
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
