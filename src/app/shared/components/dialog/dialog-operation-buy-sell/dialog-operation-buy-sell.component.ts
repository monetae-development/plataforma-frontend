import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { MenuItem, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogResumenBuySellComponent } from '../dialog-resumen-buy-sell/dialog-resumen-buy-sell.component';

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
    InputNumberModule 
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
  amount: number = 0;
  amountPurchaseCommision: number = 0;
  amountSaleCommision: number = 0;
  comission: number = 0;
  coinSubtitle: string = '';

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private _serviceCommonProxy: ServiceCommonProxy,
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
    this.loadCryptoAssets();
  }

  private _buildPurchaseForm(): FormGroup {
    return this.fb.group({
      cryptoAssetId: [{ value: null, disabled: true}, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  private _buildSaleForm(): FormGroup {
    return this.fb.group({
      cryptoAssetId: [{ value: null, disabled: true}, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  get cryptoAssetIdPurchaseControl() { return this.purchaseForm.controls['cryptoAssetId'] as FormControl; }
  get amountPurchaseControl() { return this.purchaseForm.controls['amount'] as FormControl; }

  get cryptoAssetIdSaleControl() { return this.saleForm.controls['cryptoAssetId'] as FormControl; }
  get amountSaleControl() { return this.saleForm.controls['amount'] as FormControl; }

  loadCryptoAssets(){
    this._serviceCommonProxy.getSelectOptions('OTCTrading/GetAllCryptoCoins', null)
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
    if (event.value == null) {
      this.coinSubtitle = null;
      return;
    }
    this.coinSubtitle = event.value.subtitle;
  }

  amountPurchaseOnChange(event: any) {
    if (event.value == null) {
      this.amountPurchaseCommision = null;
      return;
    }
    this.amountPurchaseControl.setValue(event.value);
    this.calculatePurchaseCost();
  }

  amountSaleOnChange(event: any) {
    if (event.value == null) {
      this.amountSaleCommision = null;
      return;
    }
    this.amountSaleControl.setValue(event.value);
    this.calculateSaleCost();
  }

  calculatePurchaseCost() {
    if (this.amount) {
      this.amountPurchaseCommision = (this.amountPurchaseControl.value * this.comission) / 100;
    } else {
      this.amountPurchaseCommision = undefined;
    }
  }

  calculateSaleCost() {
    if (this.amount) {
      this.amountSaleCommision = (this.amountSaleControl.value * this.comission) / 100;
    } else {
      this.amountSaleCommision = undefined;
    }
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  onContinuePurchase(): void {
    const ref = this.dialogService.open(DialogResumenBuySellComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: {
        title: 'Resumen de compra',
        titleAction: 'Comprar',
        resumenSend: this.purchaseForm.value,
        amountCommision: this.amountPurchaseCommision
      }
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogResumenBuySellComponent;
    instance?.outAccept.subscribe(() => {
      this.ref.close();
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
        amountCommision: this.amountSaleCommision
      }
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogResumenBuySellComponent;
    instance?.outAccept.subscribe(() => {
      this.ref.close();
    });
  }

  setMaxAmount(): void {
    this.amountPurchaseControl.setValue(this.amount);
  }

}
