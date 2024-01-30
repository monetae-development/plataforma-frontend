import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
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

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeIndex: Number = 0;
  isStepOne: Boolean = true;

  uploadUrl: string;
  uploadedOperationProof: any[] = [];

  destinationAccount: string;
  uploadFileDepositReceipt = false;

  platformBankAccount: any;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
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
    this.menuItems = [
      { label: 'Depositar' },
      { label: 'Retirar' }
    ];
    this.activeItem = this.menuItems[Number(this.activeIndex)];
    this.fiatDeposit = new CreateMntMemberFiatDto();
    this.fiatWithdrawal = new CreateMntMemberFiatWithdrawalDto();
    this.memberBankAccount = new GetMntMemberBankAccountForViewDto();
  }

  loadBankAccounts() {
    this.refreshMemberBankAccounts = true;
    this.loadBankAccountsComplete = false;
    this._serviceCommonProxy.getSelectSubtitleOptions('MntMemberBankAccounts/GetAllBankAccountsForSelect', null).subscribe((result) => {
      console.log(result);
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
      console.log(result);
      if (result.totalCount > 0) {
        this.hasPlatformBankAccounts = true;
      } else {
        this.hasPlatformBankAccounts = false;
      }
      this.loadPlatformBankAccountsComplete = true;
      this.platformBankAccounts = result.items;
    });
  }

  refreshBankAccounts() {
    this.loadBankAccounts();
  }

  onChangeMemberAccount(event: any) {
    console.log(event);
    if (event.value != null || event.value !== undefined) {
      this._serviceMemberProxy.getBankAccountByMemberForView(event.value).subscribe((result) => {
        this.memberBankAccount = result;
        console.log(result);
      });
    }
  }

  onChangePlatformBankAccount(event: any) {
    console.log(event);
    this.platformBankAccount = this.platformBankAccounts.find(item => item.value === event.value);
    console.log(this.platformBankAccount);
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
    elementoInput.value = text
    document.body.appendChild(elementoInput);
    elementoInput.select();
    document.execCommand('copy');
    document.body.removeChild(elementoInput);
    this.notify.success(this.l('Copiado a portapapeles'));
  }

  onCancel(){
    this.ref.close();
  }

  saveDeposit(): void{
    this.saving = true;
    this._serviceMemberProxy.createFiatDepositByMember(this.fiatDeposit)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe((result) => {
        this.notify.info(this.l('SavedSuccessfully'));
        abp.message.success(this.l('OTCRequestCreatedSuccessfully'), this.l('RequestSuccessfully', result.folio));
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

  onContinueWithdraw(): void{
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
      if(values){
        this._messageService
        .add({ 
          severity: 'success', 
          summary: 'Solicitud de Retiro finalizada', 
          detail: 'Su solicitud de retiro se ha realizado con éxito' 
        });
      }
    });
  }

  uploadExcel(data: { files: File }): void {
    const formData: FormData = new FormData();
    const file = data.files[0];
    formData.append('file', file, file.name);
    this._httpClient
        .post<any>(this.uploadUrl, formData)
        .pipe(finalize(() => this.excelFileUpload.clear()))
        .subscribe((response) => {
            if (response.success) {
                this.notify.success(this.l('ImportUsersProcessStart'));
            } else if (response.error != null) {
                this.notify.error(this.l('ImportUsersUploadFailed'));
            }
        });
  }

  onUploadExcelError(): void {
      this.notify.error(this.l('ImportUsersUploadFailed'));
  }

  // upload event
  onUploadFile(event, recordFiles): void {
    for (const file of event.files) {
        recordFiles.push(file);
        console.log(file);
        console.log(recordFiles);
        if(recordFiles){
            console.log("entra al record")
            const fileParameter: FileParameter = {
                data: file,
                fileName: file.name
            };
            this._mntMemberFilesServiceProxy.uploadDepositReceipt(fileParameter).subscribe((result) => {
              this.uploadFileDepositReceipt = true;
                console.log(result);
            });
        }
    }
}

  onBeforeSend(event): void {
      event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
  }

  showDialogAddBankAccount(): void {
    const ref = this.dialogService.open(DialogAddBankAccountComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
    });
  }

}
