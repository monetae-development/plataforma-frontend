import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatActivityEconomicCategoriesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatActivityEconomicCategoryDto } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomicCategories/CreateOrEditCatActivityEconomicCategoryDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';




@Component({
    selector: 'createOrEditCatActivityEconomicCategoryModal',
    templateUrl: './create-or-edit-catActivityEconomicCategory-modal.component.html'
})
export class CreateOrEditCatActivityEconomicCategoryModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    catActivityEconomicCategory: CreateOrEditCatActivityEconomicCategoryDto = new CreateOrEditCatActivityEconomicCategoryDto();

    constructor(
        injector: Injector,
        private _catActivityEconomicCategoriesServiceProxy: CatActivityEconomicCategoriesServiceProxy
    ) {
        super(injector);
    }

    show(catActivityEconomicCategoryId?: number): void {
        if (!catActivityEconomicCategoryId) {
            this.catActivityEconomicCategory = new CreateOrEditCatActivityEconomicCategoryDto();
            this.catActivityEconomicCategory.id = catActivityEconomicCategoryId;


            this.active = true;
            this.modal.show();
        } else {
            this._catActivityEconomicCategoriesServiceProxy.getCatActivityEconomicCategoryForEdit(catActivityEconomicCategoryId).subscribe(result => {
                this.catActivityEconomicCategory = result.catActivityEconomicCategory;



                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catActivityEconomicCategoriesServiceProxy.createOrEdit(this.catActivityEconomicCategory)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {
    }
}
