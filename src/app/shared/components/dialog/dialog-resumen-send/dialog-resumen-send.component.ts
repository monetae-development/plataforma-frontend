import { Component, EventEmitter, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-resumen-send',
  templateUrl: './dialog-resumen-send.component.html',
  styleUrls: ['./dialog-resumen-send.component.css'],
  imports: [
    ButtonModule,
  ]
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

  onRequestSend(): void {

  }

}
