import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  standalone: true,
  selector: 'app-dialog-operation-buy-sell',
  templateUrl: './dialog-operation-buy-sell.component.html',
  styleUrls: ['./dialog-operation-buy-sell.component.css'],
  imports: [
    CommonModule,
    TabMenuModule,
    ButtonModule 
  ]
})
export class DialogOperationBuySellComponent implements OnInit {

  outAccept = new EventEmitter();

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeIndex: Number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { 
    this.activeIndex = config.data?.activeIndex;
  }

  ngOnInit() {
    this.menuItems = [
      { label: 'Comprar' },
      { label: 'Vender' }
    ];
    this.activeItem = this.menuItems[Number(this.activeIndex)];
  }

  onCancel(){
    this.ref.close();
  }

  onAccept(): void{
    this.outAccept.emit(true);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

}
