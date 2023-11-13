import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, OnInit, ViewChild, AfterViewInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { MntMemberDataComplementsServiceProxy,
    CreateOrEditMntMemberDto,
    CreateOrEditMntMemberIdentityDto,
    CreateOrEditMntMemberAddressDto,
    CreateOrEditMntEconomicInfoDto,
    CreateOrEditMntMemberPepDto
} from '@shared/service-proxies/service-proxies';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { CreateOrEditMntMemberComplementDto } from '@shared/service-proxies/dto/mntMembers/CreateOrEditMntMemberComplementDto';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { SessionServiceProxy, CurrentUserProfileEditDto, ProfileServiceProxy } from '@shared/service-proxies/service-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PrimeNGConfig } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { RadioButton } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { EventEmitter } from 'stream';
import { isEmpty } from 'rxjs';

@Component({
    templateUrl: './mntMemberDataComplements.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})

export class MntMemberDataComplementsComponent extends AppComponentBase implements OnInit, AfterViewInit{

    @ViewChild('memberName') memberName: Input;
    @ViewChild('memberSurname') memberSurname: Input;
    @ViewChild('memberPhone') memberPhone: Input;
    @ViewChild('memberDayOfBirth') memberDayOfBirth: Input;
    @ViewChild('memberNationality') memberNationality: Dropdown;
    @ViewChild('addressStreet') addressStreet: Input;
    @ViewChild('addressExteriorNo') addressExteriorNo: Input;
    @ViewChild('addressZipCode') addressZipCode: Input;
    @ViewChild('addressCountry') addressCountry: Dropdown;
    @ViewChild('addressState') addressState: Dropdown;
    @ViewChild('addressCity') addressCity: Input;
    @ViewChild('identityType') identityType: Dropdown;
    @ViewChild('identityId') identityId: Input;
    @ViewChild('identityExpiration') identityExpiration: Input;
    @ViewChild('economicInfoProfession') economicInfoProfession: Dropdown;
    @ViewChild('economicInfoIncome') economicInfoIncome: Input;
    @ViewChild('economicInfoSourceFounds') economicInfoSourceFounds: Dropdown;
    @ViewChild('economicInfoExpectedTransactions') economicInfoExpectedTransactions: Input;
    @ViewChild('pep') pep: RadioButton;

    personalDataNationalities: SelectItem[];
    personalDataCountries: SelectItem[];
    personalDataStates: SelectItem[];
    addressCountries: SelectItem[];
    addressStates: SelectItem[];
    identityTypes: SelectItem[];
    economicInfoProfessions: SelectItem[];
    economicInfoSourceFoundses: SelectItem[];

    public user: CurrentUserProfileEditDto;
    public memberPersonalData: CreateOrEditMntMemberDto;
    public memberPersonalDataCountryId: number;
    public memberAddress: CreateOrEditMntMemberAddressDto;
    public memberAddressCountryId: number;
    public memberIdentity: CreateOrEditMntMemberIdentityDto;
    public memberEconomicInfo: CreateOrEditMntEconomicInfoDto;
    public memberPep: CreateOrEditMntMemberPepDto;

    advancedFiltersAreShown = false;
    filterText = '';

    uploadUrl: string;
    uploadedAddressProof: any[] = [];
    uploadedFront: any[] = [];
    uploadedBack: any[] = [];
    uploadedProofIncome: any[] = [];
    uploadedTaxReturn: any[] = [];

    pattern_numbers = '^[1-9][0-9]*$';

    personalDataForm = this._formBuilder.group({
        'memberName': new FormControl('', Validators.required),
        'memberSurname': new FormControl('', Validators.required),
        'memberPhone': new FormControl('', Validators.required),
        'memberNationality': new FormControl('', Validators.required),
        'memberDayOfBirth': new FormControl('', Validators.required),
    });
    addressForm = this._formBuilder.group({
        'addressStreet': new FormControl('', Validators.required),
        'addressExteriorNo': new FormControl('', Validators.required),
        'addressZipCode': new FormControl('', Validators.required),
        'addressCountry': new FormControl('', Validators.required),
        'addressState': new FormControl('', Validators.required),
        'addressCity': new FormControl('', Validators.required),
    });
    identityForm = this._formBuilder.group({
        'identityType': new FormControl('', Validators.required),
        'identityId': new FormControl('', Validators.required),
        'identityExpiration': new FormControl('', Validators.required),
    });
    economicInfoForm = this._formBuilder.group({
        'economicInfoProfession': new FormControl('', Validators.required),
        'economicInfoIncome': new FormControl('', [Validators.required, Validators.pattern(this.pattern_numbers)]),
        'economicInfoSourceFounds': new FormControl('', Validators.required),
        'economicInfoExpectedTransactions': new FormControl('', Validators.required),
    });
    pepForm = this._formBuilder.group({
        'pep': new FormControl('', Validators.required),
        'pepAnswer1': new FormControl('', Validators.required),
        'pepAnswer2': new FormControl('', Validators.required),
        'pepAnswer3': new FormControl('', Validators.required),
    });

    checkSessionAndComplemented = false;
    isMemberComplemented = false;
    completed = false;
    isPep: boolean;
    saving = false;
    isValid = false;
    isClientRole = false;

    private member: CreateOrEditMntMemberComplementDto;

    constructor(
        injector: Injector,
        private _sessionServiceProxy: SessionServiceProxy,
        //TODO:Ajustar nombres de servicios
        private _serviceMembersProxy: ServiceMembersProxy,
        private _serviceCommonProxy: ServiceCommonProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _primeConfig: PrimeNGConfig,
        private _profileService: ProfileServiceProxy,
        private _formBuilder: FormBuilder,
        private _dateTimeService: DateTimeService,
    ) {
        super(injector);
        this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/DemoUiComponents/UploadFiles';
    }

    ngOnInit(): void {
        this.translatePrimeComponents();
        this.user = new CurrentUserProfileEditDto();
        this.member = new CreateOrEditMntMemberComplementDto();
        this.memberPersonalData = new CreateOrEditMntMemberDto();
        this.memberAddress = new  CreateOrEditMntMemberAddressDto();
        this.memberIdentity = new CreateOrEditMntMemberIdentityDto();
        this.memberEconomicInfo = new CreateOrEditMntEconomicInfoDto();
        this.memberPep = new CreateOrEditMntMemberPepDto();

        this._sessionServiceProxy.getCurrentLoignIsClientRole().subscribe((result) => {
            this.isClientRole = result.hasClientRole;

            if (!result.hasClientRole){
                abp.message.warn('El formulario para complementar datos es de uso exclusivo para clientes de Monetae.<br><br> El formulario será visible pero los datos no podrán ser guardados.', 'Atención', {isHtml: true});
            }

            this._sessionServiceProxy.getCurrentLoginInformations().subscribe((session) => {
                if (this.isClientRole){
                    this._serviceMembersProxy.getIsMemberComplemented(session.user.id).subscribe((result) => {
                        this.isMemberComplemented = result.isCompleted;
                        this.checkSessionAndComplemented = true;
                        if (!this.isMemberComplemented){
                            this.formInit();
                        }
                    });
                }else{
                    this.checkSessionAndComplemented = true;
                    this.formInit();
                }
            });
        });
    }

    ngAfterViewInit(){

    }

    formInit(){
        this._profileService.getCurrentUserProfileForEdit().subscribe((result) => {
            this.user = result;
            this.disableSelects();
            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllNationalitiesForSelect', null).subscribe((result) => {
                this.personalDataNationalities = result.items;
                this.memberNationality.placeholder = this.l('SelectAnItemDropdown');
                this.memberNationality.disabled = false;
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllContriesForSelect', null).subscribe((result) => {
                this.personalDataCountries = result.items;
                this.addressCountries = result.items;
                this.addressCountry.placeholder = this.l('SelectAnItemDropdown');
                this.addressCountry.disabled = false;
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllIndentitiesTypesForSelect', null).subscribe((result) => {
                this.identityTypes = result.items;
                this.identityType.placeholder = this.l('SelectAnItemDropdown');
                this.identityType.disabled = false;
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllProfessionsForSelect', null).subscribe((result) => {
                this.economicInfoProfessions = result.items;
                this.economicInfoProfession.placeholder = this.l('SelectAnItemDropdown');
                this.economicInfoProfession.disabled = false;
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllSourcesFoundsForSelect', null).subscribe((result) => {
                this.economicInfoSourceFoundses = result.items;
                this.economicInfoSourceFounds.placeholder = this.l('SelectAnItemDropdown');
                this.economicInfoSourceFounds.disabled = false;
            });

        });
    }

    // upload event
    onUpload(event, recordFiles): void{
        for (const file of event.files) {
            recordFiles.push(file);
        }
    }

    onBeforeSend(event): void {
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
    }

    onSave(){
        this.memberPersonalData.dayOfBirth = this._dateTimeService.getEndOfDayForDate(this.memberPersonalData.dayOfBirth);
        this.member.MemberPersonalData = this.memberPersonalData;
        this.member.MemberAddress = this.memberAddress;
        this.memberIdentity.expiration = this._dateTimeService.getEndOfDayForDate(this.memberIdentity.expiration);
        this.member.MemberIdentity = this.memberIdentity;
        this.member.MemberEconomicInfo = this.memberEconomicInfo;
        this.member.IsPep = this.isPep;
        this.member.MemberPep = this.memberPep;

        this.saving = true;
        if (this.personalDataForm.invalid
            || this.addressForm.invalid
            || this.identityForm.invalid
            || this.economicInfoForm.invalid
            || this.pepForm.invalid){
                this.validateForm(this.personalDataForm);
                this.validateForm(this.addressForm);
                this.validateForm(this.identityForm);
                this.validateForm(this.economicInfoForm);
                this.validateForm(this.pepForm);
                this.completed = false;
                this.saving = false;
                this.isValid = false;
        }else{
            if (!this.isClientRole){
                abp.message.error('El formulario para complementar datos es de uso exclusivo para clientes de Monetae.<br><br> No es posible guardar la información.', 'Error', {isHtml: true});
            }else{
                this.isValid = true;
                this._serviceMembersProxy.createOrEdit(this.member).subscribe((result) => {
                    this.completed = true;
                    this.saving = false;
                    this.isMemberComplemented = true;
                });
            }
        }
    }

    onAddressChangeCountry(event?: EventEmitter): void{
        this.addressState.placeholder = this.l('loading');
        this.addressState.disabled = true;
        this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllStatesForSelect', this.memberAddressCountryId).subscribe((result) => {
            this.addressStates = result.items;
            this.addressState.placeholder = this.l('SelectAnItemDropdown');
            this.addressState.disabled = false;
        });
    }

    validateForm(formGroup: FormGroup): boolean {
        let firstElement = false;
        let validate = true;
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            let tempElement;
            if (control.enabled){
                if (!control.valid){
                    control.markAsDirty();
                    //console.log(field);
                    //console.log(this[field]);
                    validate = false;
                    if (!firstElement){
                        if (this?.[field]?.el !== undefined){
                            tempElement = this[field].el.nativeElement.parentElement.parentElement.parentElement;
                            tempElement?.scrollIntoView({behavior: 'smooth'});
                        }else if (this?.[field]?.inputViewChild !== undefined){
                            tempElement = this[field].inputViewChild.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                            tempElement?.scrollIntoView({behavior: 'smooth'});
                        }else if (this?.[field] !== undefined){
                            tempElement = this[field].nativeElement.parentElement.parentElement.parentElement;
                            tempElement?.scrollIntoView({behavior: 'smooth'});
                        }
                        firstElement = true;
                    }
                }
            }
        });
        return validate;
    }

    disableControlsPep(){
        Object.keys(this.pepForm.controls).forEach(field => {
            const control = this.pepForm.get(field);
            if (field.includes('Answer')){
                if (!this.isPep){
                    control.disable();
                }else{
                    control.enable();
                }
            }
        });
    }

    protected disableSelects(){
        this.memberNationality.disabled = true;
        this.addressCountry.disabled = true;
        this.addressState.disabled = true;
        this.identityType.disabled = true;
    }

    protected translatePrimeComponents(){
        this._primeConfig.setTranslation({
            monthNames: [
                this.l('monthName1'),
                this.l('monthName2'),
                this.l('monthName3'),
                this.l('monthName4'),
                this.l('monthName5'),
                this.l('monthName6'),
                this.l('monthName7'),
                this.l('monthName8'),
                this.l('monthName9'),
                this.l('monthName10'),
                this.l('monthName11'),
                this.l('monthName12')],
            monthNamesShort: [
                this.l('monthNameShort1'),
                this.l('monthNameShort2'),
                this.l('monthNameShort3'),
                this.l('monthNameShort4'),
                this.l('monthNameShort5'),
                this.l('monthNameShort6'),
                this.l('monthNameShort7'),
                this.l('monthNameShort8'),
                this.l('monthNameShort9'),
                this.l('monthNameShort10'),
                this.l('monthNameShort11'),
                this.l('monthNameShort12')],
            dayNames: [
                this.l('dayName1'),
                this.l('dayName2'),
                this.l('dayName3'),
                this.l('dayName4'),
                this.l('dayName5'),
                this.l('dayName6'),
                this.l('dayName7')],
            dayNamesShort: [
                this.l('dayNameShort1'),
                this.l('dayNameShort2'),
                this.l('dayNameShort3'),
                this.l('dayNameShort4'),
                this.l('dayNameShort5'),
                this.l('dayNameShort6'),
                this.l('dayNameShort7')],
            dayNamesMin: [
                this.l('dayNameMin1'),
                this.l('dayNameMin2'),
                this.l('dayNameMin3'),
                this.l('dayNameMin4'),
                this.l('dayNameMin5'),
                this.l('dayNameMin6'),
                this.l('dayNameMin7')],
            weekHeader: this.l('PrimeNGWeekHeader'),
        });
    }
}
