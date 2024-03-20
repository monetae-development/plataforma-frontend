import { NgModule } from '@angular/core';
import { PlatformSettingsRoutingModule } from './platform-settings-routing.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { PlatformSettingsComponent } from './platform-settings.component';
import { PurchaseSellComponent } from './PurchaseSell/PurchaseSell.component';
import { LevelsComponent } from './Levels/Levels.component';
import { TransactionsSendComponent } from './transactions-send/transactions-send.component';

@NgModule({
    declarations: [PlatformSettingsComponent, PurchaseSellComponent, LevelsComponent, TransactionsSendComponent],
    imports: [AppSharedModule, AdminSharedModule, PlatformSettingsRoutingModule],
})
export class PlatformSettingsModule { }
