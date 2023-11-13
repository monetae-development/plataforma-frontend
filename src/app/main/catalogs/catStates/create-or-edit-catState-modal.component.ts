import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatStatesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatStateDto } from '@shared/service-proxies/dto/Catalogs/CatStates/CreateOrEditCatStateDto';
import { CatStateCatCountryLookupTableDto} from '@shared/service-proxies/dto/Catalogs/CatStates/CatStateCatCountryLookupTableDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatStateModal',
    templateUrl: './create-or-edit-catState-modal.component.html'
})
export class CreateOrEditCatStateModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    catState: CreateOrEditCatStateDto = new CreateOrEditCatStateDto();

    catCountryTitle = '';

	allCatCountrys: CatStateCatCountryLookupTableDto[];

    constructor(
        injector: Injector,
        private _catStatesServiceProxy: CatStatesServiceProxy
    ) {
        super(injector);
    }

    show(catStateId?: number): void {
        if (!catStateId) {
            this.catState = new CreateOrEditCatStateDto();
            this.catState.id = catStateId;
            this.catCountryTitle = '';


            this.active = true;
            this.modal.show();
        } else {
            this._catStatesServiceProxy.getCatStateForEdit(catStateId).subscribe(result => {
                this.catState = result.catState;

                this.catCountryTitle = result.catCountryTitle;


                this.active = true;
                this.modal.show();
            });
        }
        this._catStatesServiceProxy.getAllCatCountryForTableDropdown().subscribe(result => {
						this.allCatCountrys = result;
					});
    }

    save(): void {
            this.saving = true;
            this._catStatesServiceProxy.createOrEdit(this.catState)
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
