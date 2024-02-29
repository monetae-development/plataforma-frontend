import { Component, Injector, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { SettingsPlatformServiceProxy } from '@shared/service-proxies/service-settings-platform-proxies';
import { OTCSettingsDto } from '@shared/service-proxies/dto/SettingsPlatform/OTCSettingsDto';
import { result } from 'lodash-es';

@Component({
  selector: 'otc-settings',
  templateUrl: './OTC.component.html'
})
export class OTCComponent extends AppComponentBase implements OnInit {
  moreOptionsAreShown = false;
  otcSettings: OTCSettingsDto;
  saving = false;

  constructor(injector: Injector, private _settingsPlatformServiceProxy: SettingsPlatformServiceProxy) {
    super(injector);
    this.otcSettings = new OTCSettingsDto();
  }

  ngOnInit() {
    this._settingsPlatformServiceProxy.getOTCSettings().subscribe(result => {
      this.otcSettings = result.otcSettings;
    });
  }

  save() {
    this.saving = true;
    this._settingsPlatformServiceProxy.updateOTCSettings(this.otcSettings)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
      });
  }
}
