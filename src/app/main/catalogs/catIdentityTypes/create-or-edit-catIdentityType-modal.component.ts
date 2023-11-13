import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatIdentityTypesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatIdentityTypeDto } from '@shared/service-proxies/dto/Catalogs/CatIdentityType/CreateOrEditCatIdentityTypeDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatIdentityTypeModal',
    templateUrl: './create-or-edit-catIdentityType-modal.component.html'
})
export class CreateOrEditCatIdentityTypeModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    catIdentityType: CreateOrEditCatIdentityTypeDto = new CreateOrEditCatIdentityTypeDto();

    constructor(
        injector: Injector,
        private _catIdentityTypesServiceProxy: CatIdentityTypesServiceProxy
    ) {
        super(injector);
    }

    show(catIdentityTypeId?: number): void {
        if (!catIdentityTypeId) {
            this.catIdentityType = new CreateOrEditCatIdentityTypeDto();
            this.catIdentityType.id = catIdentityTypeId;


            this.active = true;
            this.modal.show();
        } else {
            this._catIdentityTypesServiceProxy.getCatIdentityTypeForEdit(catIdentityTypeId).subscribe(result => {
                this.catIdentityType = result.catIdentityType;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catIdentityTypesServiceProxy.createOrEdit(this.catIdentityType)
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
