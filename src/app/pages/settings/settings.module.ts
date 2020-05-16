import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
  ],
  declarations: [SettingsPage, ThemeSwitcherComponent, LanguageSwitcherComponent]
})
export class SettingsPageModule {}
