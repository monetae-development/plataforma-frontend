import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { RegisterTenantComponent } from './register-tenant.component';
import { RegisterTenantRoutingModule } from './register-tenant-routing.module';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    imports: [AppSharedModule, AccountSharedModule, RegisterTenantRoutingModule, PasswordModule ],
    declarations: [RegisterTenantComponent],
})
export class RegisterTenantModule {}
