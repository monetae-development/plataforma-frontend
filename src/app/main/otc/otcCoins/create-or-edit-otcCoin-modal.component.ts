import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { OTCCoinsServiceProxy, CreateOrEditOTCCoinDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditOTCCoinModal',
    templateUrl: './create-or-edit-otcCoin-modal.component.html'
})
export class CreateOrEditOTCCoinModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    otcCoin: CreateOrEditOTCCoinDto = new CreateOrEditOTCCoinDto();

    constructor(
        injector: Injector,
        private _otcCoinsServiceProxy: OTCCoinsServiceProxy
    ) {
        super(injector);
    }

    show(otcCoinId?: number): void {
        if (!otcCoinId) {
            this.otcCoin = new CreateOrEditOTCCoinDto();
            this.otcCoin.id = otcCoinId;
            this.active = true;
            this.modal.show();
        } else {
            this._otcCoinsServiceProxy.getOTCCoinForEdit(otcCoinId).subscribe(result => {
                this.otcCoin = result.otcCoin;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._otcCoinsServiceProxy.createOrEdit(this.otcCoin)
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
