import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @ViewChild(LanguageSwitcherComponent, { static: true }) languageSwitcher: LanguageSwitcherComponent;
  @ViewChild(ThemeSwitcherComponent, { static: true }) themeSwitcher: ThemeSwitcherComponent;
  public language = 'en';
  public color = '#69bb7bff';

  constructor() { }

  ngOnInit() { }

  openLanguageSwitcherDialog() {
    this.languageSwitcher.presentActionSheetForLanguage();
  }

  openThemeSwitcherDialog() {
    this.themeSwitcher.presentActionSheetForChangingTheme();
  }
}
