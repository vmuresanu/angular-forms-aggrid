import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-cell-select-renderer',
  template: `
    <div *ngIf="formGroup" class="cell-renderer" [ngClass]="{'field-errored':formControl.invalid}">
      <span class="cell-renderer-value">{{value}}</span>
    </div>
  `,
  styleUrls: ['./cell-select-renderer.component.scss']
})
export class CellSelectRendererComponent implements ICellRendererAngularComp {

  formGroup: FormGroup;
  formControl: FormControl;
  controlName: string;
  value: any;
  private rowId;

  constructor() { }

  agInit(params: any): void {
    this.controlName =  params.column.colDef.field;
    this.rowId = params.node.id;
    this.refresh(params);
  }

  refresh(params: any): boolean {
    this.formGroup = params.context.formGroup.controls[this.rowId];
    if (this.formGroup) {
      this.formControl = this.formGroup.get(this.controlName) as FormControl;
      this.value = params.value;
      /* this.formControl.setValue(this.value);*/
    }

    return true;
  }


}
