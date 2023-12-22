import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dialog-project-information',
  templateUrl: './dialog-project-information.component.html',
  styleUrls: ['./dialog-project-information.component.css']
})
export class DialogProjectInformationComponent implements OnInit {

  outAccept = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
