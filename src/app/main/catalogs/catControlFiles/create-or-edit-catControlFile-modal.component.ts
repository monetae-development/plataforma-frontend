import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatControlFilesServiceProxy, CreateOrEditCatControlFileDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatControlFileModal',
    templateUrl: './create-or-edit-catControlFile-modal.component.html'
})
export class CreateOrEditCatControlFileModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    catControlFile: CreateOrEditCatControlFileDto = new CreateOrEditCatControlFileDto();

    constructor(
        injector: Injector,
        private _catControlFilesServiceProxy: CatControlFilesServiceProxy
    ) {
        super(injector);
    }

    show(catControlFileId?: number): void {
        if (!catControlFileId) {
            this.catControlFile = new CreateOrEditCatControlFileDto();
            this.catControlFile.id = catControlFileId;
            this.active = true;
            this.modal.show();
        } else {
            this._catControlFilesServiceProxy.getCatControlFileForEdit(catControlFileId).subscribe(result => {
                this.catControlFile = result.catControlFile;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catControlFilesServiceProxy.createOrEdit(this.catControlFile)
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
