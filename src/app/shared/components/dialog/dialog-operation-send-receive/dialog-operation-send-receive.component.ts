import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateMntMemberWalletDto, MntMemberWalletServiceProxy, MntSettingsServiceProxy } from '@shared/service-proxies/service-proxies';
import { ServiceTransactionProxy } from '@shared/service-proxies/service-transaction-proxies';
import { GetAllCryptoCurrenciesForSelectDto } from '@shared/service-proxies/dto/Transactions/GetAllCryptoCurrenciesForSelectDto';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import { MenuItem, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogResumenSendComponent } from '../dialog-resumen-send/dialog-resumen-send.component';

@Component({
  standalone: true,
  selector: 'app-dialog-operation-send-receive',
  templateUrl: './dialog-operation-send-receive.component.html',
  styleUrls: ['./dialog-operation-send-receive.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabMenuModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule
  ]
})
export class DialogOperationSendReceiveComponent extends AppComponentBase implements OnInit {

  outAccept = new EventEmitter();
  sendForm: FormGroup;
  receiveForm: FormGroup;

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeIndex: Number = 0;
  cryptoAssets: SelectItem[] = undefined;
  blockchainNetworks: SelectItem[];
  cryptoCurrencies: GetAllCryptoCurrenciesForSelectDto[];
  amount = 0;
  amountCommision = 0;
  comission = 0;
  coinId = 0;
  BlockchainNetworkId = 0;
  address = '';
  coinSubtitle = '';
  actionsReceive = true;
  isDisabled = true;


  mntMemberWalletDto: CreateMntMemberWalletDto;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _serviceTransactionProxy: ServiceTransactionProxy,
    private _mntMemberWalletServiceProxy: MntMemberWalletServiceProxy,
    private _mntSettingsServiceProxy: MntSettingsServiceProxy,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
  ) {
    super(injector);
    this.activeIndex = config.data?.activeIndex;
    this.sendForm = this._buildSendForm();
    this.receiveForm = this._buildReceiveForm();
  }

  get cryptoAssetIdControl() {
    return this.sendForm.controls['cryptoAssetId'] as FormControl;
  }
  get addressControl() {
    return this.sendForm.controls['address'] as FormControl;
  }
  get blockchainNetworkIdControl() {
    return this.sendForm.controls['blockchainNetworkId'] as FormControl;
  }
  get amountControl() {
    return this.sendForm.controls['amount'] as FormControl;
  }

  get cryptoAssetIdReceiveControl() {
    return this.receiveForm.controls['cryptoAssetId'] as FormControl;
  }
  get blockchainNetworkIdReceiveControl() {
    return this.receiveForm.controls['blockchainNetworkId'] as FormControl;
  }
  get qrReceiveControl() {
    return this.receiveForm.controls['qr'] as FormControl;
  }

  ngOnInit() {
    this.menuItems = [
      { label: 'Enviar' },
      { label: 'Recibir' }
    ];
    this.activeItem = this.menuItems[Number(this.activeIndex)];
    this.loadCryptoAssets();
    //this.loadBalance();
    this.loadWalletSettings();
  }

  loadCryptoAssets() {
    this._serviceTransactionProxy.getCryptoCurrenciesForSelect().subscribe((result) => {
      this.cryptoAssets = result.items;
      this.cryptoCurrencies = result.items;
      this.cryptoAssetIdControl.enable();
      this.cryptoAssetIdReceiveControl.enable();
    });
  }

  loadBlockchainNetworks(item: GetAllCryptoCurrenciesForSelectDto) {
    for (let i = 0; i < this.cryptoCurrencies.length; i++) {
      if (item.value === this.cryptoCurrencies[i].value) {
        console.log(item.value);
        this.blockchainNetworks = this.cryptoCurrencies[i].blockchainNetworks;
        this.blockchainNetworkIdControl.enable();
        this.blockchainNetworkIdReceiveControl.enable();
        this.isDisabled = false;
        break;
      }
    }
    /*this._mntMemberWalletServiceProxy.getBlockchainNetwortksForSelect()
      .subscribe((result) => {
        this.blockchainNetwortks = result.items;
        this.blockchainNetworkIdControl.enable();
        this.blockchainNetworkIdReceiveControl.enable();
        this.isDisabled = false;
      });*/
  }

  loadBalance() {
    this._mntMemberWalletServiceProxy.getBalance()
      .subscribe((result) => {
        this.amount = result.amount;
      });
  }

  loadWalletSettings() {
    this._mntSettingsServiceProxy.getWalletSettings()
      .subscribe((result) => {
        this.comission = result.sendFee;
      });
  }

  onChangeCurrencySend(event: any) {
    if (event.value == null) {
      this.coinSubtitle = null;
      return;
    }
    this.coinSubtitle = event.value.subtitle;
    this.loadBlockchainNetworks(event.value);
  }


  onChangeCurrency(event: any) {
    this.address = '';
    this.actionsReceive = true;
  }

  amountOnChange(event: any) {
    if (event.value == null) {
      this.amountCommision = null;
      return;
    }
    this.amountControl.setValue(event.value);
    this.calculateCost();
  }

  calculateCost() {
    if (this.amount) {
      this.amountCommision = (this.amountControl.value * this.comission) / 100;
    } else {
      this.amountCommision = undefined;
    }
  }

  onCancel() {
    this.ref.close();
  }

  onContinue(): void {
    const ref = this.dialogService.open(DialogResumenSendComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: {
        resumenSend: this.sendForm.value,
        amountCommision: this.amountCommision
      }
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogResumenSendComponent;
    instance?.outAccept.subscribe(() => {
      this.ref.close();
    });
  }

  onReceive(): void {
    this.coinId = this.cryptoAssetIdReceiveControl.value.value;
    this.BlockchainNetworkId = this.blockchainNetworkIdReceiveControl.value.value;
    this._mntMemberWalletServiceProxy.getAddress(
      this.coinId,
      this.BlockchainNetworkId
    )
      .subscribe((result) => {
        this.actionsReceive = false;
        this.address = result.address;
      });
  }

  copyAddress(): void {
    const elementoInput = document.createElement('input');
    elementoInput.value = this.address;
    document.body.appendChild(elementoInput);
    elementoInput.select();
    document.execCommand('copy');
    document.body.removeChild(elementoInput);
    this.notify.success(this.l('Copiado a portapapeles'));
  }

  setMaxAmount(): void {
    this.amountControl.setValue(this.amount);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  private _buildSendForm(): FormGroup {
    return this.fb.group({
      cryptoAssetId: [{ value: null, disabled: true }, [Validators.required]],
      address: [null, [Validators.required]],
      blockchainNetworkId: [{ value: null, disabled: true }, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  private _buildReceiveForm(): FormGroup {
    return this.fb.group({
      cryptoAssetId: [{ value: null, disabled: true }, [Validators.required]],
      blockchainNetworkId: [{ value: null, disabled: true }, [Validators.required]],
      qr: [null],
    });
  }

}
