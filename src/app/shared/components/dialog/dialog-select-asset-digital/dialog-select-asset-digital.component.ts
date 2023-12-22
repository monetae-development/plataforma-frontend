import { Component, EventEmitter, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-select-asset-digital',
  templateUrl: './dialog-select-asset-digital.component.html',
  styleUrls: ['./dialog-select-asset-digital.component.css']
})
export class DialogSelectAssetDigitalComponent implements OnInit {

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
