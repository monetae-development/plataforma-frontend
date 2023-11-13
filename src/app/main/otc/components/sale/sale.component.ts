import { Component, Injector, EventEmitter, ViewChild, OnInit, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { OTCServiceProxy } from '@shared/service-proxies/service-otc-proxies';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'abp-ng2-module';
import { OTCTradingForViewDto } from '@shared/service-proxies/dto/Otc/OTCTrading/OTCTradingForViewDto';
import { CreateOTCRequestDto } from '@shared/service-proxies/dto/Otc/CreateOTCRequestDto';
import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { OTCCryptoDto } from '@shared/service-proxies/dto/Otc/OTCCryptoDto';
import { GetOTCTradingForViewDto } from '@shared/service-proxies/dto/Otc/OTCTrading/GetOTCTradingForViewDto';
import { CreateOrEditMntMemberBankAccountModalComponent } from '@app/main/members/mntMemberBankAccounts/create-or-edit-mntMemberBankAccount-modal.component';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'otc-crypto-sale',
  templateUrl: './sale.component.html'
})
export class OTCCryptoSaleComponent extends AppComponentBase implements OnInit {

  @Input() currencies: SelectItem[];
  @Output() onChange = new EventEmitter<OTCTradingForViewDto>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('createOrEditMntMemberBankAccountModal', { static: true }) createOrEditMntMemberBankAccountModal: CreateOrEditMntMemberBankAccountModalComponent;

  startbankAccounts: SelectItem[];
  bankAccounts: SelectItem[];
  started = false;
  processing = false;
  changeAmount = false;
  changeCost = false;
  refreshing = false;

  otcRequestDto: CreateOTCRequestDto;
  cryptoRecords: GetOTCTradingForViewDto[];
  cryptoKeys: OTCCryptoDto[];
  selectedCurrency: OTCTradingForViewDto;

  constructor(
    injector: Injector,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _serviceCommonProxy: ServiceCommonProxy,
    private _otcServiceProxy: OTCServiceProxy,
    private _activatedRoute: ActivatedRoute,
  ) {
    super(injector);
    this.otcRequestDto = new CreateOTCRequestDto();
    this.selectedCurrency = new OTCTradingForViewDto();
  }

  ngOnInit() {
    this.otcRequestDto.type = RequestType.Sale;
    this.loadBankAccounts();
  }

  loadBankAccounts() {
    this.refreshing = true;
    this._serviceCommonProxy.getSelectSubtitleOptions('MntMemberBankAccounts/GetAllBankAccountsForSelect', null).subscribe((result) => {
      this.bankAccounts = result.items;
      this.refreshing = false;
    });
  }


  onStart(records: GetOTCTradingForViewDto[]) {
    this.onUpdateRecords(records);
    this.started = true;
  }

  onUpdateRecords(records: GetOTCTradingForViewDto[]) {
    this.cryptoRecords = records;
    if (this.otcRequestDto.otcCoinId > 0) {
      this.selectedCurrency = this.getOtcRecordById(this.otcRequestDto.otcCoinId);
    }
    this.setCriptoKeys(records);
  }

  onUpdateCurrency(id: number) {
    this.otcRequestDto.otcCoinId = id;
    this.selectedCurrency = this.getOtcRecordById(id);
  }

  onUpdatePrice() {
    if (this.changeAmount) {
      this.calculateCost();
    } else {
      this.calculateAmount();
    }
  }

  onReset() {
    this.otcRequestDto.otcCoinId = undefined;
    this.otcRequestDto.amount = undefined;
    this.otcRequestDto.cost = undefined;
    this.otcRequestDto.mntMemberBankAccountId = undefined;
    this.selectedCurrency = new OTCTradingForViewDto();
    this.onChange.emit(this.selectedCurrency);
  }

  onChangeCurrency(event: any) {
    this.selectedCurrency = this.getOtcRecordById(event.value);
    this.otcRequestDto.otcCoinId = event.value;
    this.onChange.emit(this.selectedCurrency);
  }

  setCriptoKeys(records: GetOTCTradingForViewDto[]) {
    this.cryptoKeys = [];
    for (const record of records) {
      let temp = new OTCCryptoDto();
      temp.id = record.otcCoin.id;
      temp.name = record.otcCoin.name;
      temp.key = record.otcCoin.key;
      this.cryptoKeys.push(temp);
    }
  }

  getOtcRecordById(id: number): OTCTradingForViewDto {
    for (const record of this.cryptoRecords) {
      if (record.otcCoin.id === id) {
        return record.otcCoin;
      }
    }
    return;
  }

  amountOnChange(event: any) {
    this.changeAmount = true;
    this.changeCost = false;
    if (event.value == null) {
      this.otcRequestDto.cost = null;
      this.otcRequestDto.amount = null;
      return;
    }
    const amount = Number(event.value.toString().replace(/,/g, ''));
    this.otcRequestDto.amount = amount;
    this.calculateCost();
  }

  calculateCost() {
    if (this.selectedCurrency !== undefined && this.otcRequestDto.amount) {
      this.otcRequestDto.cost = this.otcRequestDto.amount * this.selectedCurrency.purchasePrice;
    } else {
      this.otcRequestDto.cost = undefined;
    }
  }

  costOnChange(event: any) {
    this.changeCost = true;
    this.changeAmount = false;
    if (event.value == null) {
      this.otcRequestDto.cost = null;
      this.otcRequestDto.amount = null;
      return;
    }
    const cost = Number(event.value.toString().replace(/,/g, ''));
    this.otcRequestDto.cost = cost;
    this.calculateAmount();
  }

  calculateAmount() {
    if (this.selectedCurrency !== undefined && this.otcRequestDto.cost) {
      this.otcRequestDto.amount = this.otcRequestDto.cost / this.selectedCurrency.purchasePrice;
    } else {
      this.otcRequestDto.amount = undefined;
    }
  }

  saleProcess() {
    const format: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    };
    abp.message.confirm(
      this.l('DescConfirmSale', this.selectedCurrency.key, this.otcRequestDto.cost.toLocaleString('en', format) + ' USD'),
      this.l('TitleConfirmSale'),
      (isConfirmed) => {
        if (isConfirmed) {
          this.processing = true;
          this.otcRequestDto.price = this.selectedCurrency.purchasePrice;
          this._otcServiceProxy.createRequest(this.otcRequestDto)
            .pipe(finalize(() => {
              this.processing = false;
              this.onReset();
            }))
            .subscribe((result) => {
              this.notify.info(this.l('SavedSuccessfully'));
              abp.message.success(this.l('OTCRequestCreatedSuccessfully'), this.l('RequestSuccessfully', result.folio));
              this.onSave.emit(null);
            });
        }
      });
  }

  hasBankAccount(): boolean {
    if (this.bankAccounts !== undefined) {
      if (this.bankAccounts.length > 0) {
        return true;
      }
    }
    return false;
  }

  createMemberBankAccount(): void {
    this.createOrEditMntMemberBankAccountModal.show();
  }

  refreshBankAccounts() {
    this.loadBankAccounts();
  }
}
