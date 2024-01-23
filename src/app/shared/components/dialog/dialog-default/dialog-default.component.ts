import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-default',
  templateUrl: './dialog-default.component.html',
  styleUrls: ['./dialog-default.component.css'],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class DialogDefaultComponent implements OnInit {

  icon: string = '';
  title: string = '';
  subtitle: string = '';
  info: string = '';
  titleAction: string = '';

  outAccept = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { 
    this.icon = config.data.icon;
    this.title = config.data.title;
    this.subtitle = config.data.subtitle;
    this.info = config.data.info;
    this.titleAction = config.data.titleAction;
  }

  ngOnInit() {

  }

  onAccept(){
    this.outAccept.emit(true);
  }

}
