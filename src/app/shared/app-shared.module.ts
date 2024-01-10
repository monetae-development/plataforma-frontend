import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from '@app/app-routing.module'
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module'
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module'
import { UtilsModule } from '@shared/utils/utils.module'
import { TextMaskModule } from 'angular2-text-mask'
import { FileUploadModule } from 'ng2-file-upload'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ModalModule } from 'ngx-bootstrap/modal'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { ImageCropperModule } from 'ngx-image-cropper'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { NgxSpinnerModule } from 'ngx-spinner'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { PaginatorModule } from 'primeng/paginator'
import { ProgressBarModule } from 'primeng/progressbar'
import { TableModule } from 'primeng/table'
import { TabViewModule } from 'primeng/tabview'
import { InputTextModule } from 'primeng/inputtext'
import { InputNumberModule } from 'primeng/inputnumber'
import { ChipsModule } from 'primeng/chips'
import { TooltipModule as pTooltipModule } from 'primeng/tooltip'
import { AppCommonModule } from './common/app-common.module'
import { ThemesLayoutBaseComponent } from './layout/themes/themes-layout-base.component'
import { CheckboxModule } from 'primeng/checkbox'

const imports = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule,
    TabsModule,
    BsDropdownModule,
    PopoverModule,
    BsDatepickerModule,
    AppCommonModule,
    FileUploadModule,
    AppRoutingModule,
    UtilsModule,
    ServiceProxyModule,
    TableModule,
    TabViewModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ChipsModule,
    pTooltipModule,
    PaginatorModule,
    ProgressBarModule,
    PerfectScrollbarModule,
    TextMaskModule,
    ImageCropperModule,
    AutoCompleteModule,
    NgxSpinnerModule,
    AppBsModalModule
]

@NgModule({
    imports: [...imports],
    exports: [...imports],
    declarations: [ThemesLayoutBaseComponent]
})
export class AppSharedModule {}
