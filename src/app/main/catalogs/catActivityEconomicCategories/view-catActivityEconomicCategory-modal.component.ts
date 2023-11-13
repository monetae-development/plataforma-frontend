import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatActivityEconomicCategoryForViewDto } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomicCategories/GetCatActivityEconomicCategoryForViewDto';
import { CatActivityEconomicCategoryDto } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomicCategories/CatActivityEconomicCategoryDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatActivityEconomicCategoryModal',
    templateUrl: './view-catActivityEconomicCategory-modal.component.html'
})
export class ViewCatActivityEconomicCategoryModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    item: GetCatActivityEconomicCategoryForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatActivityEconomicCategoryForViewDto();
        this.item.catActivityEconomicCategory = new CatActivityEconomicCategoryDto();
    }

    show(item: GetCatActivityEconomicCategoryForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
