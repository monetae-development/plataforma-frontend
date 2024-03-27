import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, OnInit, ViewChild, AfterViewInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    MntMemberDataComplementsServiceProxy,
    CreateOrEditMntMemberDto,
    CreateOrEditMntMemberIdentityDto,
    CreateOrEditMntMemberAddressDto,
    CreateOrEditMntEconomicInfoDto,
    MntMemberFilesServiceProxy,
    FileParameter,
} from '@shared/service-proxies/service-proxies';
import { GetMntMemberFileForUserEditDto } from '@shared/service-proxies/dto/members/mntMemberFile/GetMntMemberFileForUserEditDto';
import { GetSelectIntDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectIntDto';
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
import { FileUpload } from 'primeng/fileupload';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { EventEmitter } from 'stream';
import { isEmpty } from 'rxjs';
import { DialogDefaultComponent } from '@app/shared/components/dialog/dialog-default/dialog-default.component';
import { DialogService } from 'primeng/dynamicdialog';
import { environment } from 'environments/environment';
import { MemberStatus } from '@shared/service-proxies/enum/Members/MemberStatus.enum';
import { FileType } from '@shared/service-proxies/enum/Members/FileType.enum';

@Component({
    templateUrl: './mntMemberDataComplements.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
    providers: [DialogService],
})

export class MntMemberDataComplementsComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild('residenceCountry') residenceCountry: Dropdown;
    @ViewChild('addressCountry') addressCountry: Dropdown;
    @ViewChild('memberName') memberName: Input;
    @ViewChild('memberSurname') memberSurname: Input;
    @ViewChild('memberPhoneCode') memberPhoneCode: Dropdown;
    @ViewChild('memberPhone') memberPhone: Input;
    @ViewChild('memberDayOfBirth') memberDayOfBirth: Input;
    @ViewChild('memberNationality') memberNationality: Dropdown;
    @ViewChild('addressStreet') addressStreet: Input;
    @ViewChild('addressExteriorNo') addressExteriorNo: Input;
    @ViewChild('addressZipCode') addressZipCode: Input;
    @ViewChild('addressState') addressState: Dropdown;
    @ViewChild('addressCity') addressCity: Input;
    @ViewChild('addressFileProof') addressFileProof: FileUpload;
    @ViewChild('identityType') identityType: Dropdown;
    @ViewChild('identityId') identityId: Input;
    @ViewChild('identityExpiration') identityExpiration: Input;
    @ViewChild('identityIssuingCountry') identityIssuingCountry: Dropdown;
    @ViewChild('identityFileFront') identityFileFront: FileUpload;
    @ViewChild('identityFileBack') identityFileBack: FileUpload;
    @ViewChild('economicInfoProfession') economicInfoProfession: Dropdown;
    @ViewChild('economicInfoIncome') economicInfoIncome: Input;
    @ViewChild('economicInfoSourceFounds') economicInfoSourceFounds: Dropdown;
    @ViewChild('economicInfoExpectedTransactions') economicInfoExpectedTransactions: Input;
    @ViewChild('economicInfoFileIncomeProof') economicInfoFileIncomeProof: FileUpload;
    @ViewChild('economicInfoFileTaxReturn') economicInfoFileTaxReturn: FileUpload;
    @ViewChild('economicInfoFileTaxRecord') economicInfoFileTaxRecord: FileUpload;
    @ViewChild('pep') pep: RadioButton;

    residenceDataCountries: SelectItem[];
    personalDataNationalities: SelectItem[];
    personalDataCountries: SelectItem[];
    identityDataCountries: SelectItem[];
    personalDataStates: SelectItem[];
    personalDataPhones: SelectItem[];
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
    public memberFiles: GetMntMemberFileForUserEditDto[] = [];
    public flags: GetSelectIntDto[] = [];

    advancedFiltersAreShown = false;
    filterText = '';

    uploadedFiles = [];
    uploadFileAddressProof: boolean;
    uploadFileIdentityFront: boolean;
    uploadFileIdentityBack: boolean;
    uploadFileIncomeProof: boolean;
    uploadFileTaxReturn: boolean;
    uploadFileTaxRecord: boolean;
    uploadFileLegalOriginFounds: boolean;
    maxFileSize = environment.uploadMaxFileSize;

    minDate: Date;

    pattern_numbers = '^[1-9][0-9]*$';

    residenceForm = this._formBuilder.group({
        'residenceCountry': new FormControl('', Validators.required),
    });
    personalDataForm = this._formBuilder.group({
        'memberName': new FormControl('', Validators.required),
        'memberSurname': new FormControl('', Validators.required),
        'memberPhoneCode': new FormControl('', Validators.required),
        'memberPhone': new FormControl('', Validators.required),
        'memberNationality': new FormControl('', Validators.required),
        'memberDayOfBirth': new FormControl('', [Validators.required, this.validateAge]),
        'memberWebsite': new FormControl(''),
    });
    addressForm = this._formBuilder.group({
        'addressStreet': new FormControl('', Validators.required),
        'addressExteriorNo': new FormControl('', Validators.required),
        'addressZipCode': new FormControl('', Validators.required),
        'addressCountry': new FormControl('', Validators.required),
        'addressState': new FormControl('', Validators.required),
        'addressCity': new FormControl('', Validators.required)
    }, { validator: this.fileValidator('UploadAddressFileProof') });
    identityForm = this._formBuilder.group({
        'identityType': new FormControl('', Validators.required),
        'identityId': new FormControl('', Validators.required),
        'identityExpiration': new FormControl('', Validators.required),
        'identityIssuingCountry': new FormControl('', Validators.required),
    }, { validator: this.fileValidator('UploadIdentityFront', 'UploadIdentityBack') });
    economicInfoForm = this._formBuilder.group({
        'economicInfoProfession': new FormControl('', Validators.required),
        'economicInfoIncome': new FormControl('', [Validators.required, Validators.pattern(this.pattern_numbers)]),
        'economicInfoSourceFounds': new FormControl('', Validators.required),
        'economicInfoExpectedTransactions': new FormControl('', Validators.required),
        'economicInfoHaveExtraIncome': new FormControl('', Validators.required),
        'economicInfoExtraIncomeDetails': new FormControl('', Validators.required),
        'economicInfoExtraIncomeAmount': new FormControl('', Validators.required),
        'economicInfoYearlySalesAmount': new FormControl('', Validators.required),
        'economicInfoPreviousSalesAmount': new FormControl('', Validators.required),
    }, { validator: this.fileValidator('UploadIncomeProof', 'UploadTaxReturn', 'UploadLegalOriginFounds') });
    pepForm = this._formBuilder.group({
        'pep': new FormControl('', Validators.required),
        'swornDeclaration': new FormControl('', Validators.required),
    });

    checkSessionAndComplemented = false;
    completed = false;
    isPep: boolean;
    isSwornDeclaration = false;
    ishaveExtraIncome: boolean;
    saving = false;
    isValid = false;
    isClientRole = false;
    isModeEdit = false;
    memberStatus = MemberStatus.Register;
    memberStatusEnum = MemberStatus;
    _memberDayOfBirth = new Date();
    _memberIdentityExpiration = new Date();
    _fileType = FileType;
    feedback: string;

    step0VerifyAccount: Boolean = true;
    step1VerifyAccount: Boolean = false;
    step2VerifyAccount: Boolean = false;
    step3VerifyAccount: Boolean = false;
    step4VerifyAccount: Boolean = false;

    private member: CreateOrEditMntMemberComplementDto;

    constructor(
        injector: Injector,
        private _router: Router,
        private _sessionServiceProxy: SessionServiceProxy,
        //TODO:Ajustar nombres de servicios
        private _serviceMembersProxy: ServiceMembersProxy,
        private _serviceCommonProxy: ServiceCommonProxy,
        private _mntMemberFilesServiceProxy: MntMemberFilesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _primeConfig: PrimeNGConfig,
        private _profileService: ProfileServiceProxy,
        private _formBuilder: FormBuilder,
        private _dateTimeService: DateTimeService,
        private _dialogService: DialogService,
    ) {
        super(injector);
        this.minDate = new Date();
        this.uploadedFiles = [];

        this.economicInfoForm.get('economicInfoHaveExtraIncome').valueChanges.subscribe((value) => {
            if (value) {
                this.economicInfoForm.get('economicInfoExtraIncomeDetails').setValidators([Validators.required]);
                this.economicInfoForm.get('economicInfoExtraIncomeAmount').setValidators([Validators.required]);
            } else {
                this.economicInfoForm.get('economicInfoExtraIncomeDetails').clearValidators();
                this.economicInfoForm.get('economicInfoExtraIncomeAmount').clearValidators();
            }
            this.economicInfoForm.get('economicInfoExtraIncomeDetails').updateValueAndValidity();
            this.economicInfoForm.get('economicInfoExtraIncomeAmount').updateValueAndValidity();
        });
    }

    fileValidator(file1: string, file2?: string, file3?: string) {
        return (formGroup: FormGroup) => {
            if (file1 === 'UploadAddressFileProof' && this.uploadFileAddressProof) {
                return null;
            } else if ((file1 === 'UploadIdentityFront' && this.uploadFileIdentityFront) && (file2 === 'UploadIdentityBack' && this.uploadFileIdentityBack)) {
                return null;
            } else if ((file1 === 'UploadIncomeProof' && this.uploadFileIncomeProof)
                && (file2 === 'UploadTaxReturn' && this.uploadFileTaxReturn)
                && (file3 === 'LegalOriginFounds' && this.uploadFileLegalOriginFounds)) {
                return null;
            } else {
                return { externalConditionInvalid: true };
            }
        };
    }

    ngOnInit(): void {
        this.translatePrimeComponents();
        this.user = new CurrentUserProfileEditDto();
        this.member = new CreateOrEditMntMemberComplementDto();
        this.memberPersonalData = new CreateOrEditMntMemberDto();
        this.memberAddress = new CreateOrEditMntMemberAddressDto();
        this.memberIdentity = new CreateOrEditMntMemberIdentityDto();
        this.memberEconomicInfo = new CreateOrEditMntEconomicInfoDto();

        this.isClientRole = this.appSession.hasClientRole;

        if (this.isClientRole) {
            this._serviceMembersProxy.getStatus().subscribe((result) => {
                this.memberStatus = result.status;
                this.feedback = result.feedback;
                this.checkSessionAndComplemented = true;
                switch (this.memberStatus) {
                    case MemberStatus.Register:
                        this.openMessageDialogVerifyAccount();
                        this.formInit();
                        break;
                    case MemberStatus.Approved:
                        this.openMessageDialogApproveAccount();
                        break;
                    case MemberStatus.Refused:
                        this.openMessageDialogRefusedAccount();
                        this.formInit();
                        break;
                    default:
                        this.openMessageDialogSuccessAccount();
                        break;
                }
            });
        } else {
            this.openMessageDialogRolAdministrador();
            this.checkSessionAndComplemented = true;
            this.formInit();
        }
    }

    ngAfterViewInit() {

    }

    formInit() {
        this._profileService.getCurrentUserProfileForEdit().subscribe((result) => {
            this.user = result;
            this.memberPersonalData.phoneCodeId = this.user.phoneCodeId;
            this.memberPersonalData.phone = this.user.phoneNumber;
            this.residenceCountry.disabled = true;

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllContriesForSelect', null).subscribe((result) => {
                this.residenceDataCountries = result.items;
                this.personalDataCountries = result.items;
                this.identityDataCountries = result.items;
                this.addressCountries = result.items;
                this.residenceCountry.disabled = false;
                this.residenceCountry.placeholder = this.l('SelectAnItemDropdown');
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllNationalitiesForSelect', null).subscribe((result) => {
                this.personalDataNationalities = result.items;
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllCountryPhoneCodesForSelect', null).subscribe((result) => {
                this.personalDataPhones = result.items;
                this.flags = [];
                for (const record of result.items) {
                    let temp = new GetSelectIntDto();
                    temp.value = record.value;
                    temp.label = record.label;
                    temp.subtitle = record.subtitle;
                    this.flags[record.value] = temp;
                }
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllIndentitiesTypesForSelect', null).subscribe((result) => {
                this.identityTypes = result.items;
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllProfessionsForSelect', null).subscribe((result) => {
                this.economicInfoProfessions = result.items;
            });

            this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllSourcesFoundsForSelect', null).subscribe((result) => {
                this.economicInfoSourceFoundses = result.items;
            });

            if (this.memberStatus === MemberStatus.Refused) {
                this.getForUserEdit();
            } else {
                this.uploadFileAddressProof = false;
                this.uploadFileIdentityFront = false;
                this.uploadFileIdentityBack = false;
                this.uploadFileIncomeProof = false;
                this.uploadFileTaxReturn = false;
                this.uploadFileTaxRecord = false;
                this.uploadFileLegalOriginFounds = false;
            }
        });
    }

    getForUserEdit() {
        this._serviceMembersProxy.getForUserEdit().subscribe((result) => {
            this.memberPersonalData = result.MemberPersonalData;
            this.isPep = this.memberPersonalData.isPep;
            this._memberDayOfBirth = new Date(result.MemberPersonalData.dayOfBirth.toString());
            this.memberAddress = result.MemberAddress;
            this.memberAddressCountryId = this.memberAddress.catCountryId;
            this.onAddressChangeCountry();
            this.memberIdentity = result.MemberIdentity;
            this._memberIdentityExpiration = new Date(this.memberIdentity.expiration.toString());
            this.memberEconomicInfo = result.MemberEconomicInfo;
            this.memberFiles = result.MemberFiles;

            this.uploadFileAddressProof = true;
            this.uploadedFiles['UploadAddressProof'] = { 'fileName': this.getFile(this._fileType.AddressProof).originalName, 'fileSize': '' };
            this.uploadFileIdentityFront = true;
            this.uploadedFiles['UploadIdentityFront'] = { 'fileName': this.getFile(this._fileType.IdentityFront).originalName, 'fileSize': '' };
            this.uploadFileIdentityBack = true;
            this.uploadedFiles['UploadIdentityBack'] = { 'fileName': this.getFile(this._fileType.IdentityBack).originalName, 'fileSize': '' };
            this.uploadFileIncomeProof = true;
            this.uploadedFiles['UploadIncomeProof'] = { 'fileName': this.getFile(this._fileType.IncomeProof).originalName, 'fileSize': '' };
            this.uploadFileTaxReturn = true;
            this.uploadedFiles['UploadTaxReturn'] = { 'fileName': this.getFile(this._fileType.TaxReturn).originalName, 'fileSize': '' };

            if (this.getFile(this._fileType.TaxRecord).file !== undefined) {
                this.uploadFileTaxRecord = true;
                this.uploadedFiles['UploadTaxRecord'] = { 'fileName': this.getFile(this._fileType.TaxRecord).originalName, 'fileSize': '' };
            }

            if (this.getFile(this._fileType.LegalOriginFounds).file !== undefined) {
                this.uploadFileLegalOriginFounds = true;
                this.uploadedFiles['UploadLegalOriginFounds'] = { 'fileName': this.getFile(this._fileType.LegalOriginFounds).originalName, 'fileSize': '' };
            }

            this.isModeEdit = true;
        });
    }

    getFile(type: FileType): GetMntMemberFileForUserEditDto {
        let file = new GetMntMemberFileForUserEditDto();
        if (this.memberStatus !== MemberStatus.Refused || this.memberFiles == null) {
            file.type = FileType.Unknown;
            return file;
        }
        for (let item of this.memberFiles) {
            if (item.type === type) {
                file = item;
                break;
            }
        }
        return file;
    }

    onClearUploadFileAddressProof() {
        this.addressFileProof.clear();
        this.uploadFileAddressProof = false;
    }

    onClearUploadFileIdentityFront() {
        this.identityFileFront.clear();
        this.uploadFileIdentityFront = false;
    }

    onClearUploadFileIdentityBack() {
        this.identityFileBack.clear();
        this.uploadFileIdentityBack = false;
    }

    onClearUploadFileIncomeProof() {
        this.economicInfoFileIncomeProof.clear();
        this.uploadFileIncomeProof = false;
    }

    onClearUploadFileTaxReturn() {
        this.economicInfoFileTaxReturn.clear();
        this.uploadFileTaxReturn = false;
    }

    onClearUploadFileTaxRecord() {
        this.economicInfoFileTaxRecord.clear();
        this.uploadFileTaxRecord = false;
    }

    onClearUploadFileLegalOriginFounds() {
        this.economicInfoFileTaxRecord.clear();
        this.uploadFileLegalOriginFounds = false;
    }

    // upload event
    onUploadFile(event, typeUpload: string): void {
        for (const file of event.currentFiles) {
            let uploadFile = { 'type': typeUpload, 'fileName': file.name, 'fileSize': file.size };
            const fileParameter: FileParameter = {
                data: file,
                fileName: file.name
            };

            if (typeUpload === 'UploadAddressProof') {
                this._mntMemberFilesServiceProxy.uploadAddressProof(fileParameter).subscribe((result) => {
                    this.uploadFileAddressProof = true;
                    this.uploadedFiles['UploadAddressProof'] = uploadFile;
                    this.addressForm.updateValueAndValidity();
                });
            } else if (typeUpload === 'UploadIdentityFront') {
                this._mntMemberFilesServiceProxy.uploadIdentityFront(fileParameter).subscribe((result) => {
                    this.uploadFileIdentityFront = true;
                    this.uploadedFiles['UploadIdentityFront'] = uploadFile;
                    this.identityForm.updateValueAndValidity();
                });
            } else if (typeUpload === 'UploadIdentityBack') {
                this._mntMemberFilesServiceProxy.uploadIdentityBack(fileParameter).subscribe((result) => {
                    this.uploadFileIdentityBack = true;
                    this.uploadedFiles['UploadIdentityBack'] = uploadFile;
                    this.identityForm.updateValueAndValidity();
                });
            } else if (typeUpload === 'UploadIncomeProof') {
                this._mntMemberFilesServiceProxy.uploadIncomeProof(fileParameter).subscribe((result) => {
                    this.uploadFileIncomeProof = true;
                    this.uploadedFiles['UploadIncomeProof'] = uploadFile;
                    this.economicInfoForm.updateValueAndValidity();
                });
            } else if (typeUpload === 'UploadTaxReturn') {
                this._mntMemberFilesServiceProxy.uploadTaxReturn(fileParameter).subscribe((result) => {
                    this.uploadFileTaxReturn = true;
                    this.uploadedFiles['UploadTaxReturn'] = uploadFile;
                    this.economicInfoForm.updateValueAndValidity();
                });
            } else if (typeUpload === 'UploadTaxRecord') {
                this._mntMemberFilesServiceProxy.uploadTaxRecord(fileParameter).subscribe((result) => {
                    this.uploadFileTaxRecord = true;
                    this.uploadedFiles['UploadTaxRecord'] = uploadFile;
                });
            } else if (typeUpload === 'UploadLegalOriginFounds') {
                this._mntMemberFilesServiceProxy.uploadLegalOriginFounds(fileParameter).subscribe((result) => {
                    this.uploadFileLegalOriginFounds = true;
                    this.uploadedFiles['UploadLegalOriginFounds'] = uploadFile;
                });
            }
        }
    }

    onRemoveFile(event, typeUpload: string) {
        if (typeUpload === 'UploadAddressProof') {
            this.uploadFileAddressProof = false;
        } else if (typeUpload === 'UploadIdentityFront') {
            this.uploadFileIdentityFront = false;
        } else if (typeUpload === 'UploadIdentityBack') {
            this.uploadFileIdentityBack = false;
        } else if (typeUpload === 'UploadIncomeProof') {
            this.uploadFileIncomeProof = false;
        } else if (typeUpload === 'UploadTaxReturn') {
            this.uploadFileTaxReturn = false;
        } else if (typeUpload === 'UploadTaxRecord') {
            this.uploadFileTaxRecord = false;
        } else if (typeUpload === 'UploadLegalOriginFounds') {
            this.uploadFileLegalOriginFounds = false;
        }
    }

    onBeforeSend(event): void {
        event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
    }

    onSave() {
        this.memberPersonalData.name = this.user.name;
        this.memberPersonalData.surname = this.user.surname;
        this.memberPersonalData.dayOfBirth = this._dateTimeService.getEndOfDayForDate(this._memberDayOfBirth);
        this.memberPersonalData.isPep = this.isPep;
        this.member.MemberPersonalData = this.memberPersonalData;
        this.member.MemberAddress = this.memberAddress;
        this.memberIdentity.expiration = this._dateTimeService.getEndOfDayForDate(this._memberIdentityExpiration);
        this.member.MemberIdentity = this.memberIdentity;
        this.member.MemberEconomicInfo = this.memberEconomicInfo;
        this.saving = true;
        if (this.personalDataForm.invalid
            || this.addressForm.invalid
            || this.identityForm.invalid
            || this.economicInfoForm.invalid
            || this.pepForm.invalid
            || !this.uploadFileAddressProof
            || !this.uploadFileIdentityBack
            || !this.uploadFileIdentityFront
            || !this.uploadFileIncomeProof
            || !this.uploadFileTaxReturn) {
            this.validateForm(this.personalDataForm);
            this.validateForm(this.addressForm);
            this.validateForm(this.identityForm);
            this.validateForm(this.economicInfoForm);
            this.validateForm(this.pepForm);
            this.completed = false;
            this.saving = false;
            this.isValid = false;
        } else {
            //console.log(this.member);
            if (!this.isClientRole) {
                this.openMessageDialogRolAdministrador();
            } else {
                this.isValid = true;
                this._serviceMembersProxy.createOrEdit(this.member).subscribe((result) => {
                    this.completed = true;
                    this.saving = false;
                    this.openMessageDialogSuccessAccount();
                });
            }
        }
    }

    convertKbToMb(kilobytes: number, precision: number = 2): number {
        return parseFloat((kilobytes / 1024).toFixed(precision));
    }

    onAddressChangeCountry(event?: EventEmitter): void {
        if (this.addressState !== undefined) {
            this.addressState.placeholder = this.l('loading');
            this.addressState.disabled = true;
        }
        this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllStatesForSelect', this.memberAddressCountryId).subscribe((result) => {
            this.addressStates = result.items;
            if (this.addressState !== undefined) {
                this.addressState.disabled = false;
                this.addressState.placeholder = this.l('SelectAnItemDropdown');
            }
        });
    }

    validateForm(formGroup: FormGroup): boolean {
        let firstElement = false;
        let validate = true;
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            let tempElement;
            if (control.enabled) {
                if (!control.valid) {
                    control.markAsDirty();
                    //console.log(field);
                    //console.log(this[field]);
                    validate = false;
                    if (!firstElement) {
                        if (this?.[field]?.el !== undefined) {
                            tempElement = this[field].el.nativeElement.parentElement.parentElement.parentElement;
                            tempElement?.scrollIntoView({ behavior: 'smooth' });
                        } else if (this?.[field]?.inputViewChild !== undefined) {
                            tempElement = this[field].inputViewChild.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                            tempElement?.scrollIntoView({ behavior: 'smooth' });
                        } else if (this?.[field] !== undefined) {
                            tempElement = this[field].nativeElement.parentElement.parentElement.parentElement;
                            tempElement?.scrollIntoView({ behavior: 'smooth' });
                        }
                        firstElement = true;
                    }
                }
            }
        });
        return validate;
    }

    disableControlsPep() {
        Object.keys(this.pepForm.controls).forEach(field => {
            const control = this.pepForm.get(field);
            if (field.includes('Answer')) {
                if (!this.isPep) {
                    control.disable();
                } else {
                    control.enable();
                }
            }
        });
    }

    backStep(step: number): void {
        if (step === 0) {
            this.step0VerifyAccount = true;
            this.step1VerifyAccount = false;
        } else if (step === 1) {
            this.step1VerifyAccount = true;
            this.step2VerifyAccount = false;
        } else if (step === 2) {
            this.step2VerifyAccount = true;
            this.step3VerifyAccount = false;
        } else if (step === 3) {
            this.step3VerifyAccount = true;
            this.step4VerifyAccount = false;
        }
    }

    nextStep(step: number): void {
        if (step === 0) {
            if (this.residenceForm.invalid) {
                this.validateForm(this.residenceForm);
            } else {
                this.step0VerifyAccount = false;
                this.step1VerifyAccount = true;
            }
        } else if (step === 1) {
            if (this.personalDataForm.invalid) {
                this.validateForm(this.personalDataForm);
            } else {
                this.step1VerifyAccount = false;
                this.step2VerifyAccount = true;
            }
        } else if (step === 2) {
            this.addressForm.updateValueAndValidity();
            if (this.addressForm.invalid) {
                this.validateForm(this.addressForm);
            } else {
                this.step2VerifyAccount = false;
                this.step3VerifyAccount = true;
            }
        } else if (step === 3) {
            this.identityForm.updateValueAndValidity();
            if (this.identityForm.invalid) {
                this.validateForm(this.identityForm);
            } else {
                this.step3VerifyAccount = false;
                this.step4VerifyAccount = true;
            }
        }
    }

    protected translatePrimeComponents() {
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

    private validateSwornDeclaration(control) {
        if (control.value == null || control.value === '') {
            return null;
        }
        return control.value;
    }

    private validateAge(control) {
        if (control.value == null || control.value === '') {
            return null;
        }
        const fechaNacimiento = new Date(control.value);
        let edad = 1;

        const hoy = new Date();
        edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad = edad - 1;
        }

        return edad >= 18 ? null : { menorDeEdad: true };
    }

    private openMessageDialogRolAdministrador(): void {
        const ref = this._dialogService.open(DialogDefaultComponent, {
            showHeader: false,
            styleClass: 'ae-dialog ae-dialog--default ae-dialog--sm',
            data: {
                icon: 'pi pi-id-card',
                title: 'El formulario es de uso exclusivo para clientes de Monetae.',
                subtitle: 'El formulario será visible pero los datos no podrán ser guardados.',
                titleAction: 'Aceptar'
            }
        });
        const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
        dialogRef?.changeDetectorRef.detectChanges();
        const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
        instance?.outAccept.subscribe(() => {
            ref.close();
        });
    }

    private openMessageDialogVerifyAccount(): void {
        const ref = this._dialogService.open(DialogDefaultComponent, {
            showHeader: false,
            styleClass: 'ae-dialog ae-dialog--default ae-dialog--sm',
            data: {
                icon: 'pi pi-id-card',
                title: 'Verificar cuenta',
                subtitle: 'Completa la verificación KYC para continuar con la operación',
                titleAction: 'Empezar ahora'
            }
        });
        const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
        dialogRef?.changeDetectorRef.detectChanges();
        const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
        instance?.outAccept.subscribe(() => {
            ref.close();
        });
    }

    private openMessageDialogSuccessAccount(): void {
        const ref = this._dialogService.open(DialogDefaultComponent, {
            showHeader: false,
            styleClass: 'ae-dialog ae-dialog--default',
            data: {
                icon: 'pi pi-id-card',
                title: 'Gracias por completar el proceso de verificación',
                subtitle: 'Actualmente, estamos analizando tus datos con diligencia. En breve, te informaremos los resultados. ¡Gracias por tu paciencia!"',
                titleAction: this.l('Continue'),
            }
        });
        const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
        dialogRef?.changeDetectorRef.detectChanges();
        const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
        instance?.outAccept.subscribe(() => {
            this._router.navigate(['app/main/dashboard']);
            ref.close();
        });
    }

    private openMessageDialogApproveAccount(): void {
        const ref = this._dialogService.open(DialogDefaultComponent, {
            showHeader: false,
            styleClass: 'ae-dialog ae-dialog--default ae-dialog--sm',
            data: {
                icon: 'pi pi-id-card',
                title: '"¡Felicidades! Tu verificación de identidad KYC ha sido exitosa',
                titleAction: 'Depositar saldo'
            }
        });
        const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
        dialogRef?.changeDetectorRef.detectChanges();
        const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
        instance?.outAccept.subscribe(() => {
            this._router.navigate(['app/main/dashboard', 'fiat-deposit']);
            ref.close();
        });
    }

    private openMessageDialogRefusedAccount(): void {
        const ref = this._dialogService.open(DialogDefaultComponent, {
            showHeader: false,
            styleClass: 'ae-dialog ae-dialog--default ae-text-danger ae-dialog--sm',
            data: {
                icon: 'pi pi-id-card',
                title: this.l('KycRequestRefusedDialogTitle'),
                subtitle: this.l('KycRequestRefusedDialogMessage'),
                titleAction: 'Aceptar'
            }
        });
        const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
        dialogRef?.changeDetectorRef.detectChanges();
        const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
        instance?.outAccept.subscribe(() => {
            //this._router.navigate(['app/main/dashboard']);
            ref.close();
        });
    }
}
