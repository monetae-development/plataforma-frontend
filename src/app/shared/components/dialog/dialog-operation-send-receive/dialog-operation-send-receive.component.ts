import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import { OTCCryptoDto } from '@shared/service-proxies/dto/Otc/OTCCryptoDto';
import { GetOTCTradingForViewDto } from '@shared/service-proxies/dto/Otc/OTCTrading/GetOTCTradingForViewDto';
import { CreateMntMemberWalletDto, MntMemberWalletServiceProxy, MntSettingsServiceProxy } from '@shared/service-proxies/service-proxies';
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
  receiveForm: FormGroup;

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeIndex: Number = 0;
  cryptoAssets: SelectItem[];
  blockchainNetwortks: SelectItem[];
  amount: number = 0;
  started = false;
  processing = false;

  mntMemberWalletDto : CreateMntMemberWalletDto;
  // cryptoRecords: GetOTCTradingForViewDto[];
  // cryptoKeys: GetSelectDto[];

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _mntMemberWalletServiceProxy: MntMemberWalletServiceProxy,
    private _mntSettingsServiceProxy: MntSettingsServiceProxy,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
  ) { 
    super(injector);
    this.activeIndex = config.data?.activeIndex;
    this.receiveForm = this._buildForm();
  }

  ngOnInit() {
    this.menuItems = [
      { label: 'Enviar' },
      { label: 'Recibir' }
    ];
    this.activeItem = this.menuItems[Number(this.activeIndex)];
    this.loadCryptoAssets();
    this.loadBlockchainNetwortks();
    this.loadBalance();
    this.loadWalletSettings();
  }

  private _buildForm(): FormGroup {
    return this.fb.group({
      cryptoAssetId: [null, [Validators.required]],
      address: [null, [Validators.required]],
      blockchainNetworkId: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  get cryptoAssetIdControl() { return this.receiveForm.controls['cryptoAssetId'] as FormControl; }
  get addressControl() { return this.receiveForm.controls['address'] as FormControl; }
  get blockchainNetworkIdControl() { return this.receiveForm.controls['blockchainNetworkId'] as FormControl; }
  get amountControl() { return this.receiveForm.controls['amount'] as FormControl; }

  loadCryptoAssets(){
    this._mntMemberWalletServiceProxy.getCryptoAssetsForSelect()
      .subscribe((result) => {
        this.cryptoAssets = result.items;
        console.log(this.cryptoAssets);
      });
  }

  loadBlockchainNetwortks(){
    this._mntMemberWalletServiceProxy.getBlockchainNetwortksForSelect()
      .subscribe((result) => {
        this.blockchainNetwortks = result.items
        console.log(result);
      });
  }

  loadBalance(){
    this._mntMemberWalletServiceProxy.getBalance()
      .subscribe((result) => {
        console.log(result);
        this.amount = result.amount;
      });
  }

  loadWalletSettings(){
    this._mntSettingsServiceProxy.getWalletSettings()
    .subscribe((result) => {
      console.log(result);
    });
  }

  onReset() {

  }

  onChangeCurrency(event: any) {
    // this.mntMemberWalletDto.cryptoAssetId = event.value;
    console.log(event);
    console.log(this.receiveForm.value);
    console.log(this.cryptoAssetIdControl.value);
  }


  onCancel(){
    this.ref.close();
  }

  onContinue(): void{
    const ref = this.dialogService.open(DialogResumenSendComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: this.receiveForm.value
    });
  }

  onReceive(): void{
    
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

}
