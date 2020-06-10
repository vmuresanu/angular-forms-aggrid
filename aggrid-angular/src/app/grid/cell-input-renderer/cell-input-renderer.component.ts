import { Component, Input, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cell-input-render',
  template: `
    <div *ngIf="formGroup" class="cell-renderer" [ngClass]="{'field-errored':formControl.invalid}">
      <span class="cell-renderer-value">{{value}}</span>
    </div>
  `,
  styleUrls: ['./cell-input-renderer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CellInputRendererComponent implements ICellEditorAngularComp {

  @Input() formGroup: FormGroup;
  controlName: string;
  public value;
  columnName: string;
  formControl: FormControl;
  private rowId: any;

  @ViewChild('targetInput', { read: ViewContainerRef }) public targetInput;

  getValue(): any {
    return this.value;
  }

  agInit(params: any): void {
    this.columnName = params.column.colDef.headerName;
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

  // TODO: Extract this to some sort of Error Service
  getErrors() {
    if (this.formGroup.get(this.controlName).hasError('required')) {
      return `${this.columnName} is required`;
    }
    // @ts-ignore
    if (this.formGroup.hasError('modelOrPrice') && (this.controlName === 'model' || this.controlName === 'price')) {
      return 'Either model or price is required';
    }
    if (this.formGroup.get(this.controlName).hasError('emailIsTaken')) {
      return 'W is invalid';
    }
  }
}
