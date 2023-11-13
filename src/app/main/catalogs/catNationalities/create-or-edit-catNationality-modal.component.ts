import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatNationalitiesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatNationalityDto } from '@shared/service-proxies/dto/Catalogs/CatNationalities/CreateOrEditCatNationalityDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatNationalityModal',
    templateUrl: './create-or-edit-catNationality-modal.component.html'
})
export class CreateOrEditCatNationalityModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    catNationality: CreateOrEditCatNationalityDto = new CreateOrEditCatNationalityDto();

    constructor(
        injector: Injector,
        private _catNationalitiesServiceProxy: CatNationalitiesServiceProxy
    ) {
        super(injector);
    }

    show(catNationalityId?: number): void {
        if (!catNationalityId) {
            this.catNationality = new CreateOrEditCatNationalityDto();
            this.catNationality.id = catNationalityId;
            this.active = true;
            this.modal.show();
        } else {
            this._catNationalitiesServiceProxy.getCatNationalityForEdit(catNationalityId).subscribe(result => {
                this.catNationality = result.catNationality;



                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;
        this._catNationalitiesServiceProxy.createOrEdit(this.catNationality)
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
