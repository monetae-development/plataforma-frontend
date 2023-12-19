import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  standalone: true,
  selector: 'app-dialog-operation-send-receive',
  templateUrl: './dialog-operation-send-receive.component.html',
  styleUrls: ['./dialog-operation-send-receive.component.css'],
  imports: [
    CommonModule,
    TabMenuModule,
    ButtonModule
  ]
})
export class DialogOperationSendReceiveComponent implements OnInit {

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
      { label: 'Enviar' },
      { label: 'Recibir' }
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
