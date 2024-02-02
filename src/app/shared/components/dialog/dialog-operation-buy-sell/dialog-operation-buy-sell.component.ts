import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogResumenBuySellComponent } from '../dialog-resumen-buy-sell/dialog-resumen-buy-sell.component';
import { ServiceTradingProxy } from '@shared/service-proxies/service-trading-proxies';
import { ToastModule } from 'primeng/toast';
import { RequestType } from '@shared/service-proxies/enum/MemberTrading/RequestType.enum';
import { DialogDefaultComponent } from '../dialog-default/dialog-default.component';

@Component({
  standalone: true,
  selector: 'app-dialog-operation-buy-sell',
  templateUrl: './dialog-operation-buy-sell.component.html',
  styleUrls: ['./dialog-operation-buy-sell.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabMenuModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    ToastModule
  ],
  providers: [
    MessageService,
    DialogService
  ]
})
export class DialogOperationBuySellComponent extends AppComponentBase implements OnInit {

  outAccept = new EventEmitter();
  purchaseForm: FormGroup;
  saleForm: FormGroup;

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeIndex: Number = 0;
  cryptoAssets: SelectItem[] = undefined;
  purchasePrice: number = 0;
  salePrice: number = 0;
  amount: number = 0;
  amountSale: number = 0;
  amountPurchaseCommision: number = 0;
  amountSaleCommision: number = 0;
  comissionPurchase: number = 0;
  comissionSale: number = 0;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private _serviceTradingProxy: ServiceTradingProxy,
    private _messageService: MessageService,
    private _dialogService: DialogService,
  ) { 
    super(injector);
    this.activeIndex = config.data?.activeIndex;
    this.purchaseForm = this._buildPurchaseForm();
    this.saleForm = this._buildSaleForm();
  }

  ngOnInit() {
    this.menuItems = [
      { label: 'Comprar' },
      { label: 'Vender' }
    ];
    this.activeItem = this.menuItems[Number(this.activeIndex)];
    this.loadBalance();
    this.loadCryptoAssets();
  }

  private _buildPurchaseForm(): FormGroup {
    return this.fb.group({
      cryptoCurrencyId: [{ value: null, disabled: true}, [Validators.required]],
      amountCrypto: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  private _buildSaleForm(): FormGroup {
    return this.fb.group({
      cryptoCurrencyId: [{ value: null, disabled: true}, [Validators.required]],
      amountCrypto: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  get cryptoAssetIdPurchaseControl() { return this.purchaseForm.controls['cryptoCurrencyId'] as FormControl; }
  get amountCryptoPurchaseControl() { return this.purchaseForm.controls['amountCrypto'] as FormControl; }
  get amountPurchaseControl() { return this.purchaseForm.controls['amount'] as FormControl; }

  get cryptoAssetIdSaleControl() { return this.saleForm.controls['cryptoCurrencyId'] as FormControl; }
  get amountCryptoSaleControl() { return this.saleForm.controls['amountCrypto'] as FormControl; }
  get amountSaleControl() { return this.saleForm.controls['amount'] as FormControl; }

  loadBalance(){
    this._serviceTradingProxy.getFiatBalance()
    .subscribe((result) => {
      this.amount = result.amount;
    });
  }

  loadCryptoAssets(){
    this._serviceTradingProxy.getAllCryptoCurrencies()
    .subscribe((result) => {
      this.cryptoAssets = result.items;
      this.cryptoAssetIdPurchaseControl.enable();
      this.cryptoAssetIdSaleControl.enable();
    });
  }

  onCancel(){
    this.ref.close();
  }

  onChangeCurrencyPurchase(event: any) {
    console.log(event);
    if (event.value == null) {
      this.purchasePrice = null;
      return;
    }
    this.purchasePrice = event.value.purchasePrice;
    this.comissionPurchase = event.value.fee;
  }

  onChangeCurrencySale(event: any) {
    if (event.value == null) {
      this.salePrice = null;
      return;
    }
    this.getCryptoBalance(event.value.value);
    this.salePrice = event.value.salePrice;
    this.comissionSale = event.value.fee;
  }

  amountCryptoPurchaseOnChange(event: any) {
    if (event.value == null) {
      console.log("entra");
      this.amountPurchaseCommision = null;
      this.amountPurchaseControl.setValue(null);
      return;
    }
    if(this.cryptoAssetIdPurchaseControl.value){
      this.amountCryptoPurchaseControl.setValue(event.value);
      this.calculatePurchaseCost(event.value);
    }
  }

  amountPurchaseOnChange(event: any) {
    if (event.value == null) {
      this.amountPurchaseCommision = null;
      this.amountCryptoPurchaseControl.setValue(null);
      return;
    }
    if(this.cryptoAssetIdPurchaseControl.value){
      this.amountPurchaseControl.setValue(event.value);
      this.calculateCryptoPurchaseCost(event.value);
    }
  }

  amountCryptoSaleOnChange(event: any) {
    if (event.value == null) {
      this.amountSaleCommision = null;
      this.amountSaleControl.setValue(null);
      return;
    }
    if(this.cryptoAssetIdSaleControl.value){
      this.amountCryptoSaleControl.setValue(event.value);
      this.calculateSaleCost(event.value);
      console.log("entra");
    }
  }

  amountSaleOnChange(event: any) {
    console.log(event);
    if (event.value == null) {
      this.amountSaleCommision = null;
      this.amountCryptoSaleControl.setValue(null);
      return;
    }
    if(this.cryptoAssetIdSaleControl.value){
      this.amountSaleControl.setValue(event.value);
      this.calculateCryptoSaleCost(event.value);
    }
  }

  calculatePurchaseCost(amount) {
    if (amount) {
      this.amountPurchaseControl.setValue(amount*this.purchasePrice);
      this.amountPurchaseCommision = (this.amountPurchaseControl.value * this.comissionPurchase) / 100;
    } else {
      this.amountPurchaseCommision = undefined;
    }
  }

  calculateCryptoPurchaseCost(amount) {
    if (amount) {
      this.amountCryptoPurchaseControl.setValue(amount/this.purchasePrice);
      this.amountPurchaseCommision = (this.amountPurchaseControl.value * this.comissionPurchase) / 100;
    } else {
      this.amountPurchaseCommision = undefined;
    }
  }

  calculateSaleCost(amount) {
    if (amount) {
      this.amountSaleControl.setValue(amount*this.salePrice);
      this.amountSaleCommision = (this.amountSaleControl.value * this.comissionSale) / 100;
    } else {
      this.amountSaleCommision = undefined;
    }
  }

  calculateCryptoSaleCost(amount) {
    if (amount) {
      this.amountCryptoSaleControl.setValue(amount/this.salePrice);
      this.amountSaleCommision = (this.amountSaleControl.value * this.comissionSale) / 100;
    } else {
      this.amountSaleCommision = undefined;
    }
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  onContinuePurchase(): void {
    console.log(this.purchaseForm.value);
    // return;
    const ref = this.dialogService.open(DialogResumenBuySellComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: {
        title: 'Resumen de compra',
        titleAction: 'Comprar',
        resumenSend: this.purchaseForm.value,
        amountCommision: this.amountPurchaseCommision,
        amountPrice: this.purchasePrice,
        type: RequestType.Purchase
      }
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogResumenBuySellComponent;
    instance?.outAccept.subscribe((values) => {
      this.openSuccessDialogFolio(values);
    });
  }

  onContinueSale(): void {
    const ref = this.dialogService.open(DialogResumenBuySellComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: {
        title: 'Resumen de venta',
        titleAction: 'Vender',
        resumenSend: this.saleForm.value,
        amountCommision: this.amountSaleCommision,
        amountPrice: this.salePrice,
        type: RequestType.Sale
      }
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogResumenBuySellComponent;
    instance?.outAccept.subscribe((values) => {
      this.openSuccessDialogFolio(values);
    });
  }

  setMaxAmount(): void {
    this.amountPurchaseControl.setValue(this.amount);
  }

  private getCryptoBalance(cryptoCurrencyId){
    console.log(cryptoCurrencyId);
    this._serviceTradingProxy.getCryptoBalance(cryptoCurrencyId)
    .subscribe((result) => {
      console.log(result.amount);
      this.amountSale = result.amount;
    });
  }

  private openSuccessDialogFolio(folio): void {
    const ref = this._dialogService.open(DialogDefaultComponent, {
        showHeader: false,
        styleClass: 'ae-dialog ae-dialog--default ae-dialog--sm',
        data: {
            icon: 'pi pi-id-card',
            title: this.l('OTCRequestCreatedSuccessfully'),
            subtitle: this.l('RequestSuccessfully', folio),
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

}
