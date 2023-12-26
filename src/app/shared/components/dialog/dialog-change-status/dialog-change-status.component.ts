import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  standalone: true,
  selector: 'app-dialog-change-status',
  templateUrl: './dialog-change-status.component.html',
  styleUrls: ['./dialog-change-status.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    RadioButtonModule,
    AppSharedModule
  ]
})
export class DialogChangeStatusComponent implements OnInit {

  outAccept = new EventEmitter();
  statusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
  ) { 
    this.statusForm = this._buildForm();
  }

  ngOnInit() {
  }

  private _buildForm(): FormGroup {
    return this.fb.group({
      status: [null, [Validators.required]],
    });
  }

  get priceLowControl() { return this.statusForm.controls['priceLow'] as FormControl; }

  onCancel(){
    this.ref.close();
  }

  onAccept(): void{
    this.outAccept.emit(true);
    
  }

}
