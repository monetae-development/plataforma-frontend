import { Component, EventEmitter, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-resumen-send',
  templateUrl: './dialog-resumen-send.component.html',
  styleUrls: ['./dialog-resumen-send.component.css']
})
export class DialogResumenSendComponent implements OnInit {

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
