import { Component, EventEmitter, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-resumen-buy-sell',
  templateUrl: './dialog-resumen-buy-sell.component.html',
  styleUrls: ['./dialog-resumen-buy-sell.component.css']
})
export class DialogResumenBuySellComponent implements OnInit {

  outAccept = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit() {
  }

  onCancel(){
    this.ref.close();
  }

}
