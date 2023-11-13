import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatTransactionTypesServiceProxy, CreateOrEditCatTransactionTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatTransactionTypeModal',
    templateUrl: './create-or-edit-catTransactionType-modal.component.html'
})
export class CreateOrEditCatTransactionTypeModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    catTransactionType: CreateOrEditCatTransactionTypeDto = new CreateOrEditCatTransactionTypeDto();

    constructor(
        injector: Injector,
        private _catTransactionTypesServiceProxy: CatTransactionTypesServiceProxy
    ) {
        super(injector);
    }

    show(catTransactionTypeId?: number): void {
        if (!catTransactionTypeId) {
            this.catTransactionType = new CreateOrEditCatTransactionTypeDto();
            this.catTransactionType.id = catTransactionTypeId;
            this.active = true;
            this.modal.show();
        } else {
            this._catTransactionTypesServiceProxy.getCatTransactionTypeForEdit(catTransactionTypeId).subscribe(result => {
                this.catTransactionType = result.catTransactionType;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catTransactionTypesServiceProxy.createOrEdit(this.catTransactionType)
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
