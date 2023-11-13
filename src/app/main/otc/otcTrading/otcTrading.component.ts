import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  templateUrl: './otcTrading.component.html',
  styleUrls: ['./otcTrading.component.css'],
  animations: [appModuleAnimation()]
})
export class OTCTradingComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }
}
