import { Component, Injector, EventEmitter, ViewChild, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { SelectItem } from 'primeng/api';
import { CreateProjectsInvestDto } from '@shared/service-proxies/dto/Projects/CreateProjectsInvestDto';

interface Currency {
  label: string;
  value: string;
}

@Component({
  selector: 'projects-invest-modal',
  templateUrl: './invest.component.html'
})
export class ProjectsInvestComponent extends AppComponentBase implements OnInit {
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('projectsInvestModal', { static: true }) modal: ModalDirective;

  memberBankAccounts: SelectItem[];
  dto: CreateProjectsInvestDto;
  currencies: Currency[] | undefined;
  selectedCurrency: Currency | undefined;
  fee: number;

  active = false;
  saving = false;

  constructor(
    injector: Injector,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.dto = new CreateProjectsInvestDto();
    this.currencies = [
      { label: 'USDm', value: '1' },
      { label: 'USDT', value: '2' },
      { label: 'PXO', value: '3' },
      { label: 'BTC', value: '4' },
    ];
  }

  show(): void {
    this.active = true;
    this.modal.show();
  }

  save() {

  }

  addAmount(amount: number) {

  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

}
