import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatProfessionsServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatProfessionDto } from '@shared/service-proxies/dto/Catalogs/CatProfessions/CreateOrEditCatProfessionDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatProfessionModal',
    templateUrl: './create-or-edit-catProfession-modal.component.html'
})
export class CreateOrEditCatProfessionModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    catProfession: CreateOrEditCatProfessionDto = new CreateOrEditCatProfessionDto();

    constructor(
        injector: Injector,
        private _catProfessionsServiceProxy: CatProfessionsServiceProxy
    ) {
        super(injector);
    }

    show(catProfessionId?: number): void {
        if (!catProfessionId) {
            this.catProfession = new CreateOrEditCatProfessionDto();
            this.catProfession.id = catProfessionId;


            this.active = true;
            this.modal.show();
        } else {
            this._catProfessionsServiceProxy.getCatProfessionForEdit(catProfessionId).subscribe(result => {
                this.catProfession = result.catProfession;



                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catProfessionsServiceProxy.createOrEdit(this.catProfession)
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
