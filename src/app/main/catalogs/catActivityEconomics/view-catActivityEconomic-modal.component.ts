import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatActivityEconomicForViewDto } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomics/GetCatActivityEconomicForViewDto';
import { CatActivityEconomicDto } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomics/CatActivityEconomicDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatActivityEconomicModal',
    templateUrl: './view-catActivityEconomic-modal.component.html'
})
export class ViewCatActivityEconomicModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    item: GetCatActivityEconomicForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatActivityEconomicForViewDto();
        this.item.catActivityEconomic = new CatActivityEconomicDto();
    }

    show(item: GetCatActivityEconomicForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
