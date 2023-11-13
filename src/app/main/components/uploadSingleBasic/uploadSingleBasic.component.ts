import { Component, ViewChild, Injector, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'mnt-uploadSingleBasic',
  templateUrl: './uploadSingleBasic.component.html',
  styleUrls: ['./uploadSingleBasic.component.css']
})
export class UploadSingleBasicComponent extends AppComponentBase implements OnInit, AfterViewInit {

  @Input() url: string;
  @Input () file: string;
  @Input () maxFileSizeUpload: string;
  @Input () fileMimeTypes: string;
  @Output () UploadFile = new EventEmitter();
  @Output () UrlFile = new EventEmitter();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  ngAfterViewInit () {

  }

  addFile(event: any): void {
    this.UploadFile.emit({file: event.currentFiles[0]});
  }

}
