import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatSourceFoundsForViewDto } from '@shared/service-proxies/dto/Catalogs/CatSourceFoundses/GetCatSourceFoundsForViewDto';
import { CatSourceFoundsDto } from '@shared/service-proxies/dto/Catalogs/CatSourceFoundses/CatSourceFoundsDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatSourceFoundsModal',
    templateUrl: './view-catSourceFounds-modal.component.html'
})
export class ViewCatSourceFoundsModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCatSourceFoundsForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatSourceFoundsForViewDto();
        this.item.catSourceFounds = new CatSourceFoundsDto();
    }

    show(item: GetCatSourceFoundsForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
