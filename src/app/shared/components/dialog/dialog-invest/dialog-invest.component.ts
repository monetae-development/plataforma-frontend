import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-invest',
  templateUrl: './dialog-invest.component.html',
  styleUrls: ['./dialog-invest.component.css'],
  imports: [
    ButtonModule
  ]
})
export class DialogInvestComponent implements OnInit {

  outAccept = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef
  ) { }

  ngOnInit() {
  }

  onCancel(){
    this.ref.close();
  }

  onAccept(): void{
    this.outAccept.emit(true);
  }

}
