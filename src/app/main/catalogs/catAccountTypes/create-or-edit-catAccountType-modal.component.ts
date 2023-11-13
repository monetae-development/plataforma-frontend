import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatAccountTypesServiceProxy, CreateOrEditCatAccountTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatAccountTypeModal',
    templateUrl: './create-or-edit-catAccountType-modal.component.html'
})
export class CreateOrEditCatAccountTypeModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    catAccountType: CreateOrEditCatAccountTypeDto = new CreateOrEditCatAccountTypeDto();

    constructor(
        injector: Injector,
        private _catAccountTypesServiceProxy: CatAccountTypesServiceProxy
    ) {
        super(injector);
    }

    show(catAccountTypeId?: number): void {
        if (!catAccountTypeId) {
            this.catAccountType = new CreateOrEditCatAccountTypeDto();
            this.catAccountType.id = catAccountTypeId;
            this.active = true;
            this.modal.show();
        } else {
            this._catAccountTypesServiceProxy.getCatAccountTypeForEdit(catAccountTypeId).subscribe(result => {
                this.catAccountType = result.catAccountType;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catAccountTypesServiceProxy.createOrEdit(this.catAccountType)
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
