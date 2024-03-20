import { Component, Injector, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { MenuItem, SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SettingsPlatformServiceProxy } from '@shared/service-proxies/service-settings-platform-proxies';
import { GetCryptoCurrencyFeeTransactionForSelectDto } from '@shared/service-proxies/dto/MntMemberCryptoCurrencyFee/GetCryptoCurrencyFeeTransactionForSelectDto';
import { EditCryptoCurrencyFeeTransactionInput } from '@shared/service-proxies/dto/MntMemberCryptoCurrencyFee/EditCryptoCurrencyFeeTransactionInput';
import { colorSets } from '@swimlane/ngx-charts';

@Component({
  selector: 'platform-settings-transactions-send',
  templateUrl: './transactions-send.component.html'
})
export class TransactionsSendComponent extends AppComponentBase implements OnInit {

  cryptoCurrencies: GetCryptoCurrencyFeeTransactionForSelectDto[] = [];
  cryptoCurrencySelected: GetCryptoCurrencyFeeTransactionForSelectDto;
  cryptoCurrencyUpdate: EditCryptoCurrencyFeeTransactionInput;
  cryptoCurrenciesOptions: SelectItem[] = undefined;
  cryptoCurrencyValue: number;
  saving: boolean;

  constructor(
    injector: Injector,
    private _settingsPlatformServiceProxy: SettingsPlatformServiceProxy
  ) {
    super(injector);
    this.cryptoCurrencySelected = new GetCryptoCurrencyFeeTransactionForSelectDto();
    this.cryptoCurrencyUpdate = new EditCryptoCurrencyFeeTransactionInput();
    this.saving = false;
  }

  ngOnInit() {
    this._settingsPlatformServiceProxy.getAllCryptoCurrencyFeeTransaction().subscribe(result => {
      this.cryptoCurrenciesOptions = result.items;
      for (let i = 0; i < result.items.length; i++) {
        this.cryptoCurrencies[result.items[i].value] = result.items[i];
      }
      this.cryptoCurrencyValue = result.items[0].value;
      this.cryptoCurrencySelected = this.cryptoCurrencies[this.cryptoCurrencyValue];
    });
  }

  onChangeCurrency(event: any) {
    this.cryptoCurrencySelected = this.cryptoCurrencies[this.cryptoCurrencyValue];
  }

  save() {
    this.saving = true;
    this.cryptoCurrencyUpdate.mntMemberLevelId = 1;
    this.cryptoCurrencyUpdate.tradingCryptoCurrencyId = this.cryptoCurrencySelected.value;
    this.cryptoCurrencyUpdate.transactionSendMin = this.cryptoCurrencySelected.transactionSendMin;
    this.cryptoCurrencyUpdate.transactionSendMax = this.cryptoCurrencySelected.transactionSendMax;
    this.cryptoCurrencyUpdate.transactionSendFee = this.cryptoCurrencySelected.transactionSendFee;

    this._settingsPlatformServiceProxy.updateCryptoCurrencyFeeTransaction(this.cryptoCurrencyUpdate)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
      });
  }
}
