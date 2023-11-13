import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatActivityEconomicsServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatActivityEconomicDto } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomics/CreateOrEditCatActivityEconomicDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { CatActivityEconomicCatActivityEconomicCategoryLookupTableModalComponent } from './catActivityEconomic-catActivityEconomicCategory-lookup-table-modal.component';

@Component({
    selector: 'createOrEditCatActivityEconomicModal',
    templateUrl: './create-or-edit-catActivityEconomic-modal.component.html'
})
export class CreateOrEditCatActivityEconomicModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('catActivityEconomicCatActivityEconomicCategoryLookupTableModal', { static: true }) catActivityEconomicCatActivityEconomicCategoryLookupTableModal: CatActivityEconomicCatActivityEconomicCategoryLookupTableModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    catActivityEconomic: CreateOrEditCatActivityEconomicDto = new CreateOrEditCatActivityEconomicDto();
    catActivityEconomicCategoryTitle = '';

    constructor(
        injector: Injector,
        private _catActivityEconomicsServiceProxy: CatActivityEconomicsServiceProxy
    ) {
        super(injector);
    }

    show(catActivityEconomicId?: number): void {
        if (!catActivityEconomicId) {
            this.catActivityEconomic = new CreateOrEditCatActivityEconomicDto();
            this.catActivityEconomic.id = catActivityEconomicId;
            this.catActivityEconomicCategoryTitle = '';
            this.active = true;
            this.modal.show();
        } else {
            this._catActivityEconomicsServiceProxy.getCatActivityEconomicForEdit(catActivityEconomicId).subscribe(result => {
                this.catActivityEconomic = result.catActivityEconomic;

                this.catActivityEconomicCategoryTitle = result.catActivityEconomicCategoryTitle;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catActivityEconomicsServiceProxy.createOrEdit(this.catActivityEconomic)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    openSelectCatActivityEconomicCategoryModal() {
        this.catActivityEconomicCatActivityEconomicCategoryLookupTableModal.id = this.catActivityEconomic.catActivityEconomicCategoryId;
        this.catActivityEconomicCatActivityEconomicCategoryLookupTableModal.displayName = this.catActivityEconomicCategoryTitle;
        this.catActivityEconomicCatActivityEconomicCategoryLookupTableModal.show();
    }


    setCatActivityEconomicCategoryIdNull() {
        this.catActivityEconomic.catActivityEconomicCategoryId = null;
        this.catActivityEconomicCategoryTitle = '';
    }


    getNewCatActivityEconomicCategoryId() {
        this.catActivityEconomic.catActivityEconomicCategoryId = this.catActivityEconomicCatActivityEconomicCategoryLookupTableModal.id;
        this.catActivityEconomicCategoryTitle = this.catActivityEconomicCatActivityEconomicCategoryLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
    ngOnInit(): void {
    }
}
