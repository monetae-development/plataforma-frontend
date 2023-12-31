﻿import { NgModule } from '@angular/core';
import { PlatformSettingsRoutingModule } from './platform-settings-routing.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { PlatformSettingsComponent } from './platform-settings.component';
import { OTCComponent } from './OTC/OTC.component';

@NgModule({
    declarations: [PlatformSettingsComponent, OTCComponent],
    imports: [AppSharedModule, AdminSharedModule, PlatformSettingsRoutingModule],
})
export class PlatformSettingsModule {}
