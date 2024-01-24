import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { RegisterComponent } from './register.component';
import { PasswordModule } from 'primeng/password';
import { NgxMaskModule } from 'ngx-mask';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
    imports: [
        AppSharedModule, 
        AccountSharedModule, 
        RegisterRoutingModule, 
        PasswordModule,
        RadioButtonModule, 
        NgxMaskModule.forRoot()
    ],
    declarations: [RegisterComponent],
})
export class RegisterModule {}
