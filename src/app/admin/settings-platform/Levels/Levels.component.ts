import { Component, Injector, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { SettingsPlatformServiceProxy } from '@shared/service-proxies/service-settings-platform-proxies';
import { GetAllMntMemberLevelForViewDto } from '@shared/service-proxies/dto/MntMemberLevel/GetAllMntMemberLevelForViewDto';
import { GetMntMemberLevelForViewDto } from '@shared/service-proxies/dto/MntMemberLevel/GetMntMemberLevelForViewDto';

@Component({
  selector: 'levels-settings',
  templateUrl: './Levels.component.html'
})
export class LevelsComponent extends AppComponentBase implements OnInit {

  public levels: GetAllMntMemberLevelForViewDto;
  public saving = false;

  constructor(
    injector: Injector,
    private _settingsPlatformServiceProxy: SettingsPlatformServiceProxy
  ) {
    super(injector);
    this.levels = new GetAllMntMemberLevelForViewDto();
    this.levels.level1 = new GetMntMemberLevelForViewDto();
    this.levels.level2 = new GetMntMemberLevelForViewDto();
    this.levels.level3 = new GetMntMemberLevelForViewDto();
  }

  ngOnInit() {
    this._settingsPlatformServiceProxy.getLevelsSettings().subscribe(result => {
      this.levels = result;
    });
  }

  save() {
    this.saving = true;
    this._settingsPlatformServiceProxy.updateLevelsSettings(this.levels)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
      });
  }

}
