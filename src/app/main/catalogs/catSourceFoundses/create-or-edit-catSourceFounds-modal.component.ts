import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatSourceFoundsesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatSourceFoundsDto } from '@shared/service-proxies/dto/Catalogs/CatSourceFoundses/CreateOrEditCatSourceFoundsDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';


@Component({
    selector: 'createOrEditCatSourceFoundsModal',
    templateUrl: './create-or-edit-catSourceFounds-modal.component.html'
})
export class CreateOrEditCatSourceFoundsModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    catSourceFounds: CreateOrEditCatSourceFoundsDto = new CreateOrEditCatSourceFoundsDto();

    constructor(
        injector: Injector,
        private _catSourceFoundsesServiceProxy: CatSourceFoundsesServiceProxy
    ) {
        super(injector);
    }

    show(catSourceFoundsId?: number): void {
        if (!catSourceFoundsId) {
            this.catSourceFounds = new CreateOrEditCatSourceFoundsDto();
            this.catSourceFounds.id = catSourceFoundsId;


            this.active = true;
            this.modal.show();
        } else {
            this._catSourceFoundsesServiceProxy.getCatSourceFoundsForEdit(catSourceFoundsId).subscribe(result => {
                this.catSourceFounds = result.catSourceFounds;



                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catSourceFoundsesServiceProxy.createOrEdit(this.catSourceFounds)
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
