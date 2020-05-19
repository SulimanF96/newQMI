import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {

  @Output() color = new EventEmitter();

  constructor(private actionSheetController: ActionSheetController, private themeService: ThemeService, private translateService: TranslateService) { }

  ngOnInit() { }

  async presentActionSheetForChangingTheme() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('SETTINGS.THEME'),
      mode: 'ios',
      buttons: [{
        text: this.translateService.instant('SETTINGS.TERTIARY'),
        cssClass: 'tertiary',
        handler: () => {
          this.themeService.changeTheme('tertiary-theme');
          this.themeService.color.next('#5260ff');
          this.color.emit('#5260ff');
        }
      }, {
        text: this.translateService.instant('SETTINGS.GREEN'),
        cssClass: 'green',
        handler: () => {
          this.themeService.changeTheme('green-theme');
          this.themeService.color.next('#69bb7bff');
          this.color.emit('#69bb7bff');
        }
      },
      {
        text: this.translateService.instant('SETTINGS.RED'),
        cssClass: 'red',
        handler: () => {
          this.themeService.changeTheme('red-theme');
          this.themeService.color.next('#eb445a');
          this.color.emit('#eb445a');
        }
      },
      {
        text: this.translateService.instant('SETTINGS.BLUE'),
        cssClass: 'blue',
        handler: () => {
          this.themeService.changeTheme('blue-theme');
          this.themeService.color.next('#3880ff');
          this.color.emit('#3880ff');
        }
      },
      {
        text: this.translateService.instant('SETTINGS.DARK'),
        cssClass: 'dark',
        handler: () => {
          this.themeService.changeTheme('dark-theme');
          this.themeService.color.next('#222428');
          this.color.emit('#222428');
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
