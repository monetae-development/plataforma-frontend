import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GetMntMemberBankAccountForViewDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/GetMntMemberBankAccountForViewDto';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogDefaultComponent } from '../dialog-default/dialog-default.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogAddBankAccountComponent } from '../dialog-add-bank-account/dialog-add-bank-account.component';
import { CreateMntMemberFiatWithdrawalDto } from '@shared/service-proxies/dto/members/mntMemberFiat/CreateMntMemberFiatWithdrawalDto';
import { finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DialogResumenWithdrawComponent } from '../dialog-resumen-withdraw/dialog-resumen-withdraw.component';
import { UtilsModule } from '@shared/utils/utils.module';
import { ToastModule } from 'primeng/toast';
import { FileParameter, MntMemberFilesServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateMntMemberFiatDto } from '@shared/service-proxies/dto/members/mntMemberFiat/CreateMntMemberFiatDto';
import { environment } from 'environments/environment';

@Component({
  standalone: true,
  selector: 'app-dialog-operation-deposit-withdraw',
  templateUrl: './dialog-operation-deposit-withdraw.component.html',
  styleUrls: ['./dialog-operation-deposit-withdraw.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    FileUploadModule,
    UtilsModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class DialogOperationDepositWithdrawComponent extends AppComponentBase implements OnInit {

  outAccept = new EventEmitter();

  fiatDeposit: CreateMntMemberFiatDto;
  fiatWithdrawal: CreateMntMemberFiatWithdrawalDto;
  memberBankAccount: GetMntMemberBankAccountForViewDto;
  memberBankAccounts: SelectItem[];
  platformBankAccounts: SelectItem[];
  saving = false;
  hasBankAccounts = false;
  hasPlatformBankAccounts = false;
  refreshMemberBankAccounts = false;
  loadBankAccountsComplete = false;
  loadPlatformBankAccountsComplete = false;
  loadResume = false;
  excelFileUpload: FileUpload;
  fileGuid: string;

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeIndex: Number = 0;
  isStepOne: Boolean = true;

  uploadUrl: string;
  uploadedOperationProof: any[] = [];

  destinationAccount: string;
  uploadFileDepositReceipt = false;

  platformBankAccount: any;
  messageUploadFileOperationProof = '';
  maxFileSize = environment.uploadMaxFileSize;
  memberUserName = '';

  constructor(
    injector: Injector,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private _dialogService: DialogService,
    private _serviceMemberProxy: ServiceMembersProxy,
    private _serviceCommonProxy: ServiceCommonProxy,
    private _httpClient: HttpClient,
    private _messageService: MessageService,
    private _mntMemberFilesServiceProxy: MntMemberFilesServiceProxy
  ) {
    super(injector);
    this.activeIndex = config.data?.activeIndex;
  }

  ngOnInit() {
    this.loadBankAccounts();
    this.loadPlatformBankAccounts();
    this.getMemberUserName();
    this.menuItems = [
      { label: 'Depositar' },
      { label: 'Retirar' }
    ];
    this.activeItem = this.menuItems[Number(this.activeIndex)];
    this.fiatDeposit = new CreateMntMemberFiatDto();
    this.fiatWithdrawal = new CreateMntMemberFiatWithdrawalDto();
    this.memberBankAccount = new GetMntMemberBankAccountForViewDto();
  }

  getMemberUserName() {
    this._serviceMemberProxy.getGetMemberFullName().subscribe((result) => {
      this.memberUserName = result || '';
    });
  }

  loadBankAccounts() {
    this.refreshMemberBankAccounts = true;
    this.loadBankAccountsComplete = false;
    this._serviceCommonProxy.getSelectSubtitleOptions('MntMemberBankAccounts/GetAllBankAccountsForSelect', null).subscribe((result) => {
      if (result.totalCount > 0) {
        this.hasBankAccounts = true;
      } else {
        this.hasBankAccounts = false;
      }
      this.loadBankAccountsComplete = true;
      this.memberBankAccounts = result.items;
      this.refreshMemberBankAccounts = false;
    });
  }

  loadPlatformBankAccounts() {
    this.loadPlatformBankAccountsComplete = false;
    this._serviceMemberProxy.getAllBanksForSelect().subscribe((result) => {
      if (result.totalCount > 0) {
        this.hasPlatformBankAccounts = true;
      } else {
        this.hasPlatformBankAccounts = false;
      }
      this.loadPlatformBankAccountsComplete = true;
      this.platformBankAccounts = result.items;
    });
  }

  onChangeMemberAccount(event: any) {
    if (event.value != null || event.value !== undefined) {
      this._serviceMemberProxy.getBankAccountByMemberForView(event.value).subscribe((result) => {
        this.memberBankAccount = result;
      });
    }
  }

  onChangePlatformBankAccount(event: any) {
    this.platformBankAccount = this.platformBankAccounts.find(item => item.value === event.value);
  }

  onChangeMemberAccountWithdraw(event: any) {
    if (event.value != null || event.value !== undefined) {
      this._serviceMemberProxy.getBankAccountByMemberForView(event.value).subscribe((result) => {
        this.destinationAccount = result.mntMemberBankAccount.account;
      });
    }
  }

  copyInfoBankAaccount(text: string): void {
    const elementoInput = document.createElement('input');
    elementoInput.value = text;
    document.body.appendChild(elementoInput);
    elementoInput.select();
    document.execCommand('copy');
    document.body.removeChild(elementoInput);
    this.notify.success(this.l('Copiado a portapapeles'));
  }

  onCancel() {
    this.ref.close();
  }

  saveDeposit(): void {
    this.saving = true;
    this.fiatDeposit.fileGuid = this.fileGuid;
    console.log(this.fileGuid);
    console.log(this.fiatDeposit);
    this._serviceMemberProxy.createFiatDepositByMember(this.fiatDeposit)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe((result) => {
        this.openSuccessDialogFolio(result.folio);
        this.ref.close();
      });
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  onBack(): void {
    this.isStepOne = true;
  }

  onContinueDeposit(): void {
    this.isStepOne = false;
  }

  onContinueWithdraw(): void {
    const ref = this.dialogService.open(DialogResumenWithdrawComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: {
        resumenWithdraw: this.fiatWithdrawal,
        destinationAccount: this.destinationAccount
      }
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogResumenWithdrawComponent;
    instance?.outAccept.subscribe((values) => {
      if (values) {
        this.openSuccessDialogFolio(values);
        this.ref.close();
      }
    });
  }

  onUploadFile(event, recordFiles): void {
    for (const file of event.files) {
      if (file.size > this.maxFileSize) {
        this.messageUploadFileOperationProof = `El tamaño máximo permitido para la carga de archivos es de ${this.maxFileSize}`;
        return;
      }
      if (recordFiles) {
        const fileParameter: FileParameter = {
          data: file,
          fileName: file.name
        };
        this._mntMemberFilesServiceProxy.uploadDepositReceipt(fileParameter).subscribe((result) => {
          this.fileGuid = result.fileGuid;
          this.uploadFileDepositReceipt = true;
        });
      }
    }
  }

  onRemoveFile() {
    this.uploadFileDepositReceipt = false;
  }

  onBeforeSend(event): void {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
  }

  showDialogAddBankAccount(): void {
    const ref = this.dialogService.open(DialogAddBankAccountComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogAddBankAccountComponent;
    instance?.outAccept.subscribe((values) => {
      if (values) {
        this.loadBankAccounts();
      }
    });
  }

  private openSuccessDialogFolio(folio): void {
    const ref = this._dialogService.open(DialogDefaultComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--default ae-dialog--sm',
      data: {
        icon: 'pi pi-chart-bar',
        title: this.l('OTCRequestCreatedSuccessfully'),
        subtitle: this.l('RequestSuccessfully', folio),
        titleAction: 'Aceptar'
      }
    });
    const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
    instance?.outAccept.subscribe(() => {
      this.outAccept.emit(true);
      ref.close();
      if (this._router.url === '/app/main/dashboard/history-fiat') {
        window.location.reload();
      }
      this._router.navigate(['/app/main/dashboard', 'history-fiat']);
    });
  }

}
