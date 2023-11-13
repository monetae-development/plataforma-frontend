import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { TreeDragDropService } from 'primeng/api';
import {
    BsDatepickerConfig,
    BsDatepickerModule,
    BsDaterangepickerConfig,
    BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { DcSendGridWebHooksComponent } from './dataCollected/dcSendGridWebHooks/dcSendGridWebHooks.component';
import { ViewDcSendGridWebHookModalComponent } from './dataCollected/dcSendGridWebHooks/view-dcSendGridWebHook-modal.component';
import { CreateOrEditDcSendGridWebHookModalComponent } from './dataCollected/dcSendGridWebHooks/create-or-edit-dcSendGridWebHook-modal.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

import { NgxBootstrapDatePickerConfigService } from '../../assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SubheaderModule } from '@app/shared/common/sub-header/subheader.module';
import { NgxMaskModule } from 'ngx-mask';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

@NgModule({
    imports: [
		FileUploadModule,
		AutoCompleteModule,
		PaginatorModule,
		EditorModule,
		InputMaskModule,
        TableModule,
        AdminRoutingModule,
        AdminSharedModule,
        AppSharedModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot(),
        SubheaderModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
		DcSendGridWebHooksComponent,
		ViewDcSendGridWebHookModalComponent,
		CreateOrEditDcSendGridWebHookModalComponent,
    ],
    exports: [],
    providers: [
        TreeDragDropService,
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    ],
})
export class AdminModule {}
