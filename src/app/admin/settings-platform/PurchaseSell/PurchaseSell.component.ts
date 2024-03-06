import { Component, Injector, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { SettingsPlatformServiceProxy } from '@shared/service-proxies/service-settings-platform-proxies';
import { OTCSettingsDto } from '@shared/service-proxies/dto/SettingsPlatform/OTCSettingsDto';
import { result } from 'lodash-es';

@Component({
  selector: 'purchase-sell-settings',
  templateUrl: './PurchaseSell.component.html'
})
export class PurchaseSellComponent extends AppComponentBase implements OnInit {
  moreOptionsAreShown = false;
  otcSettings: OTCSettingsDto;
  saving = false;

  constructor(injector: Injector, private _settingsPlatformServiceProxy: SettingsPlatformServiceProxy) {
    super(injector);
    this.otcSettings = new OTCSettingsDto();
  }

  ngOnInit() {
    this._settingsPlatformServiceProxy.getPurchaseSellSettings().subscribe(result => {
      this.otcSettings = result.otcSettings;
    });
  }

  save() {
    this.saving = true;
    this._settingsPlatformServiceProxy.updatePurchaseSellSettings(this.otcSettings)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
      });
  }
}
