import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
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
import { GetAllCryptoCurrenciesDto } from '@shared/service-proxies/dto/mntMemberTrading/GetAllCryptoCurrenciesDto';

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
  activeIndex = 0;
  activeCryptoCurrencyId = 0;
  cryptoAssets: SelectItem[] = undefined;
  selectedCryptoCurrency: GetAllCryptoCurrenciesDto;
  purchasePrice = 0;
  salePrice = 0;
  amountPurchase = 0;
  amountSale = 0;
  amountPurchaseCommision = 0;
  amountSaleCommision = 0;
  comissionPurchase = 0;
  comissionSale = 0;
  cryptoBalanceLoaded: boolean;
  fiatBalanceLoaded = false;
  requestType: RequestType;

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
    if (this.activeIndex === 0) {
      this.requestType = RequestType.Purchase;
    } else {
      this.requestType = RequestType.Sale;
    }
    this.activeCryptoCurrencyId = config.data?.activeCryptoCurrencyId;
    this.cryptoBalanceLoaded = false;
    this.purchaseForm = this._buildPurchaseForm();
    this.saleForm = this._buildSaleForm();
  }

  get cryptoAssetIdPurchaseControl() {
    return this.purchaseForm.controls['cryptoCurrencyId'] as FormControl;
  }
  get amountCryptoPurchaseControl() {
    return this.purchaseForm.controls['amountCrypto'] as FormControl;
  }
  get amountPurchaseControl() {
    return this.purchaseForm.controls['amount'] as FormControl;
  }

  get cryptoAssetIdSaleControl() {
    return this.saleForm.controls['cryptoCurrencyId'] as FormControl;
  }
  get amountCryptoSaleControl() {
    return this.saleForm.controls['amountCrypto'] as FormControl;
  }
  get amountSaleControl() {
    return this.saleForm.controls['amount'] as FormControl;
  }

  ngOnInit() {
    this.menuItems = [
      { label: this.l('Purchase') },
      { label: this.l('Sale') }
    ];
    this.activeItem = this.menuItems[Number(this.activeIndex)];
    this.getFiatBalance();
    this.loadCryptoAssets();
    if (this.activeCryptoCurrencyId !== undefined && this.activeCryptoCurrencyId > 0) {
      this.getCryptoBalance(this.activeCryptoCurrencyId);
    }
  }

  getFiatBalance() {
    this._serviceTradingProxy.getFiatBalance().subscribe((result) => {
      this.amountPurchase = result.amount;
      this.fiatBalanceLoaded = true;
    });
  }

  loadCryptoAssets() {
    this._serviceTradingProxy.getAllCryptoCurrenciesForSelect(this.requestType).subscribe((result) => {
      this.cryptoAssets = result.items;
      this.cryptoAssetIdPurchaseControl.enable();
      this.cryptoAssetIdSaleControl.enable();
      if (this.activeCryptoCurrencyId !== undefined) {
        for (let item of result.items) {
          if (item.value === this.activeCryptoCurrencyId) {
            this.selectedCryptoCurrency = item;
            this.purchasePrice = this.selectedCryptoCurrency.purchasePrice;
            this.comissionPurchase = this.selectedCryptoCurrency.fee;
            this.salePrice = this.selectedCryptoCurrency.salePrice;
            this.comissionSale = this.selectedCryptoCurrency.fee;
            this.cryptoAssetIdPurchaseControl.setValue(this.selectedCryptoCurrency);
            break;
          }
        }
      }
    });
  }

  onCancel() {
    this.ref.close();
  }

  onChangeCurrencyPurchase(event: any) {
    if (event.value == null) {
      this.purchasePrice = null;
      return;
    }
    this.purchasePrice = event.value.purchasePrice;
    this.comissionPurchase = event.value.fee;
    if (this.amountCryptoPurchaseControl.value !== null && this.amountCryptoPurchaseControl.value >= 0) {
      this.calculatePurchaseCost(this.amountCryptoPurchaseControl.value);
    } else if (this.amountPurchaseControl.value !== null && this.amountPurchaseControl.value >= 0) {
      this.calculateCryptoPurchaseCost(this.amountPurchaseControl.value);
    }
  }

  onChangeCurrencySale(event: any) {
    if (event.value == null) {
      this.salePrice = null;
      return;
    }
    this.getCryptoBalance(event.value.value);
    this.salePrice = event.value.salePrice;
    this.comissionSale = event.value.fee;
    if (this.amountCryptoSaleControl.value !== null && this.amountCryptoSaleControl.value >= 0) {
      this.calculateSaleCost(this.amountCryptoSaleControl.value);
    } else if (this.amountSaleControl.value !== null && this.amountSaleControl.value >= 0) {
      this.calculateCryptoSaleCost(this.amountSaleControl.value);
    }
  }

  amountCryptoPurchaseOnChange(event: any) {
    if (event.value == null) {
      this.amountPurchaseCommision = null;
      this.amountPurchaseControl.setValue(null);
      return;
    }
    if (this.cryptoAssetIdPurchaseControl.value) {
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
    if (this.cryptoAssetIdPurchaseControl.value) {
      if (event.value >= this.amountPurchase) {
        this.amountPurchaseControl.setValue(this.amountPurchase);
        this.calculateCryptoPurchaseCost(this.amountPurchase);
      } else {
        this.amountPurchaseControl.setValue(event.value);
        this.calculateCryptoPurchaseCost(event.value);
      }
    }
  }

  amountCryptoSaleOnChange(event: any) {
    if (event.value == null) {
      this.amountSaleCommision = null;
      this.amountSaleControl.setValue(null);
      return;
    }
    if (this.cryptoAssetIdSaleControl.value) {
      this.amountCryptoSaleControl.setValue(event.value);
      this.calculateSaleCost(event.value);
    }
  }

  amountSaleOnChange(event: any) {
    if (event.value == null) {
      this.amountSaleCommision = null;
      this.amountCryptoSaleControl.setValue(null);
      return;
    }
    if (this.cryptoAssetIdSaleControl.value) {
      this.amountSaleControl.setValue(event.value);
      this.calculateCryptoSaleCost(event.value);
    }
  }

  calculatePurchaseCost(amount) {
    if (amount >= 0) {
      this.amountPurchaseControl.setValue(amount * this.purchasePrice);
      this.amountPurchaseCommision = (this.amountPurchaseControl.value * this.comissionPurchase) / 100;
    } else {
      this.amountPurchaseCommision = undefined;
    }
  }

  calculateCryptoPurchaseCost(amount) {
    if (amount >= 0) {
      this.amountCryptoPurchaseControl.setValue(amount / this.purchasePrice);
      this.amountPurchaseCommision = (this.amountPurchaseControl.value * this.comissionPurchase) / 100;
    } else {
      this.amountPurchaseCommision = undefined;
    }
  }

  calculateSaleCost(amount) {
    if (amount >= 0) {
      console.log(amount);
      console.log(this.salePrice);
      this.amountSaleControl.setValue(amount * this.salePrice);
      this.amountSaleCommision = (this.amountSaleControl.value * this.comissionSale) / 100;
    } else {
      this.amountSaleCommision = undefined;
    }
  }

  calculateCryptoSaleCost(amount) {
    if (amount >= 0) {
      this.amountCryptoSaleControl.setValue(amount / this.salePrice);
      this.amountSaleCommision = (this.amountSaleControl.value * this.comissionSale) / 100;
    } else {
      this.amountSaleCommision = undefined;
    }
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    for (let i = 0; i < this.menuItems.length; i++) {
      if (this.menuItems[i].label === this.activeItem.label) {
        this.activeIndex = i;
        break;
      }
    }
    if (this.activeIndex === 0) {
      this.requestType = RequestType.Purchase;
    } else {
      this.requestType = RequestType.Sale;
    }
  }

  onContinuePurchase(): void {
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
      ref.close();
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
      ref.close();
    });
  }

  setMaxAmountPurchase(): void {
    this.amountPurchaseControl.setValue(this.amountPurchase);
    this.calculateCryptoPurchaseCost(this.amountPurchase);
  }

  setMaxAmountSale(): void {
    this.amountCryptoSaleControl.setValue(this.amountSale);
    this.calculateSaleCost(this.amountSale);
  }

  private _buildPurchaseForm(): FormGroup {
    return this.fb.group({
      cryptoCurrencyId: [{ value: null, disabled: true }, [Validators.required]],
      amountCrypto: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  private _buildSaleForm(): FormGroup {
    return this.fb.group({
      cryptoCurrencyId: [{ value: null, disabled: true }, [Validators.required]],
      amountCrypto: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  private getCryptoBalance(cryptoCurrencyId) {
    this._serviceTradingProxy.getCryptoBalance(cryptoCurrencyId)
      .subscribe((result) => {
        this.amountSale = result.amount;
        this.cryptoBalanceLoaded = true;
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
    });
  }
}
