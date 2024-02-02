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
import { ModeType } from '@shared/service-proxies/enum/MemberTrading/ModeType.enum';

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
  providers: [MessageService]
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
    this.salePrice = event.value.salePrice;
    this.comissionSale = event.value.fee;
  }
  

  amountCryptoPurchaseOnChange(event: any) {
    if (event.value == null) {
      this.amountPurchaseCommision = null;
      return;
    }
    this.amountCryptoPurchaseControl.setValue(event.value);
    this.calculatePurchaseCost(event.value);
  }

  amountPurchaseOnChange(event: any) {
    if (event.value == null) {
      this.amountPurchaseCommision = null;
      return;
    }
    this.amountPurchaseControl.setValue(event.value);
    this.calculateCryptoPurchaseCost(event.value);
  }

  amountSaleOnChange(event: any) {
    console.log(event);
    if (event.value == null) {
      this.amountSaleCommision = null;
      return;
    }
    this.amountSaleControl.setValue(event.value);
    // this.calculateSaleCost(event.value);
  }

  calculatePurchaseCost(amount) {
    console.log(amount)
    if (this.amount) {
      this.amountPurchaseControl.setValue(amount*this.purchasePrice);
      this.amountPurchaseCommision = (this.amountPurchaseControl.value * this.comissionPurchase) / 100;
    } else {
      this.amountPurchaseCommision = undefined;
    }
  }

  calculateCryptoPurchaseCost(amount) {
    if (this.amount) {
      this.amountCryptoPurchaseControl.setValue(amount/this.purchasePrice);
      this.amountPurchaseCommision = (this.amountPurchaseControl.value * this.comissionPurchase) / 100;
    } else {
      this.amountPurchaseCommision = undefined;
    }
  }

  calculateSaleCost() {
    if (this.amount) {
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
        purchasePrice: this.purchasePrice,
        modeType: ModeType.Purchase
      }
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogResumenBuySellComponent;
    instance?.outAccept.subscribe((values) => {
      console.log(values);
      if(values === ModeType.Purchase){
        this._messageService
        .add({ 
          severity: 'success', 
          summary: 'Solicitud de compra finalizada', 
          detail: 'Su solicitud de compra se ha realizado con éxito' 
        });
      }
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
        modeType: ModeType.Sell
      }
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogResumenBuySellComponent;
    instance?.outAccept.subscribe((values) => {
      if(values === ModeType.Sell){
        this._messageService
        .add({ 
          severity: 'success', 
          summary: 'Solicitud de venta finalizada', 
          detail: 'Su solicitud de venta se ha realizado con éxito' 
        });
      }
    });
  }

  setMaxAmount(): void {
    this.amountPurchaseControl.setValue(this.amount);
  }

}
