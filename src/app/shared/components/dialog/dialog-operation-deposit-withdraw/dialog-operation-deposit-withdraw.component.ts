import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GetMntMemberBankAccountForViewDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/GetMntMemberBankAccountForViewDto';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { MenuItem, SelectItem } from 'primeng/api';
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

@Component({
  standalone: true,
  selector: 'app-dialog-operation-deposit-withdraw',
  templateUrl: './dialog-operation-deposit-withdraw.component.html',
  styleUrls: ['./dialog-operation-deposit-withdraw.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabMenuModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    FileUploadModule 
  ]
})
export class DialogOperationDepositWithdrawComponent extends AppComponentBase implements OnInit {

  outAccept = new EventEmitter();

  depositForm: FormGroup;
  withdrawForm: FormGroup;

  memberBankAccount: GetMntMemberBankAccountForViewDto;
  memberBankAccounts: SelectItem[];
  active = false;
  saving = false;
  hasBankAccounts = false;
  refreshMemberBankAccounts = false;
  loadBankAccountsComplete = false;
  loadResume = false;
  excelFileUpload: FileUpload;

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeIndex: Number = 0;
  isStepOne: Boolean = true;

  mntMemberBankAccount: CreateMntMemberFiatWithdrawalDto = new CreateMntMemberFiatWithdrawalDto();

  uploadUrl: string;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private _serviceMemberProxy: ServiceMembersProxy,
    private _serviceCommonProxy: ServiceCommonProxy,
    private _httpClient: HttpClient,
  ) { 
    super(injector);
    this.activeIndex = config.data?.activeIndex;
    this.depositForm = this._buildDepositForm();
    this.withdrawForm = this._buildWithdrawForm();
  }

  ngOnInit() {
    this.menuItems = [
      { label: 'Depositar' },
      { label: 'Retirar' }
    ];
    this.activeItem = this.menuItems[Number(this.activeIndex)];
  }

  private _buildDepositForm(): FormGroup {
    return this.fb.group({
      mntMemberBankAccountId: [{ value: null, disabled: true}, [Validators.required]],
      amount: [null, [Validators.required]],
      reference: [null, [Validators.required]],
    });
  }

  private _buildWithdrawForm(): FormGroup {
    return this.fb.group({
      mntMemberBankAccountId: [{ value: null, disabled: true}, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  get mntMemberBankAccountIdDepositControl() { return this.depositForm.controls['mntMemberBankAccountId'] as FormControl; }
  get amountDepositControl() { return this.depositForm.controls['amount'] as FormControl; }
  get referenceControl() { return this.depositForm.controls['reference'] as FormControl; }

  get mntMemberBankAccountIdWithdrawControl() { return this.withdrawForm.controls['mntMemberBankAccountId'] as FormControl; }
  get amountWithdrawControl() { return this.withdrawForm.controls['amount'] as FormControl; }

  loadBankAccounts() {
    this.refreshMemberBankAccounts = true;
    this.loadBankAccountsComplete = false;
    this._serviceCommonProxy.getSelectSubtitleOptions('MntMemberBankAccounts/GetAllBankAccountsForSelect', null)
    .subscribe((result) => {
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

  onChangeMemberAccount(event: any) {
    if (event.value != null || event.value !== undefined) {
      this._serviceMemberProxy.getBankAccountByMemberForView(event.value)
      .subscribe((result) => {
        this.memberBankAccount = result;
      });
    }
  }

  onCancel(){
    this.ref.close();
  }

  onAccept(): void{
    this.outAccept.emit(true);
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
        resumenWithdraw: this.withdrawForm.value,
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

  showDialogAddBankAccount(): void {
    const ref = this.dialogService.open(DialogAddBankAccountComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
    });
  }

}
