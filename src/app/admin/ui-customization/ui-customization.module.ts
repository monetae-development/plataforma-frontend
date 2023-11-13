﻿import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UICustomizationRoutingModule } from './ui-customization-routing.module';
import { UiCustomizationComponent } from './ui-customization.component';
import { DefaultThemeUiSettingsComponent } from './default-theme-ui-settings.component';
import { Theme2ThemeUiSettingsComponent } from './theme2-theme-ui-settings.component';
import { Theme6ThemeUiSettingsComponent } from './theme6-theme-ui-settings.component';
import { Theme8ThemeUiSettingsComponent } from './theme8-theme-ui-settings.component';
import { Theme13ThemeUiSettingsComponent } from './theme13-theme-ui-settings.component';

@NgModule({
    declarations: [
        UiCustomizationComponent,
        DefaultThemeUiSettingsComponent,
        Theme2ThemeUiSettingsComponent,
        Theme6ThemeUiSettingsComponent,
        Theme8ThemeUiSettingsComponent,
        Theme13ThemeUiSettingsComponent
    ],
    imports: [AppSharedModule, AdminSharedModule, UICustomizationRoutingModule],
})
export class UICustomizationModule {}
