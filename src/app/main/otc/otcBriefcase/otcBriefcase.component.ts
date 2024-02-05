import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CryptoBehaviors } from '@shared/service-proxies/enum/OTC/CryptoBehaviors.enum';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'otc-otcBriefcase',
  templateUrl: './otcBriefcase.component.html',
  styleUrls: ['./otcBriefcase.component.css'],
})
export class OtcBriefcaseComponent extends AppComponentBase implements OnInit {

  itemsMenu: MenuItem[];
  customers: [];

  constructor(
    injector: Injector
  ) {
    super(injector);
   }

  ngOnInit() {
    this.customers = [];
    this.itemsMenu = [
      {
        label: 'Comprar'
      },
      {
        label: 'Vender'
      },
      {
        label: 'Convertir'
      }
    ]
  }

  getBehavior() {
    return CryptoBehaviors;
  }

}
