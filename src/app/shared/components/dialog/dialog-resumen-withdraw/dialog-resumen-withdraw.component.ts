import { Component, EventEmitter, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-resumen-withdraw',
  templateUrl: './dialog-resumen-withdraw.component.html',
  styleUrls: ['./dialog-resumen-withdraw.component.css']
})
export class DialogResumenWithdrawComponent implements OnInit {

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
