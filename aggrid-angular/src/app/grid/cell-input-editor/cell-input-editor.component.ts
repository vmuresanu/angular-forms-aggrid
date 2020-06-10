import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-cell-input-editor',
  template: `
    <input *ngIf="formGroup" class="cell-input" #targetInput [ngModel]="value" (ngModelChange)="onValueChanged($event)" (focusout)="gridApi.stopEditing()"/>
  `,
  styleUrls: ['./cell-input-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CellInputEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  gridApi: GridApi;
  formGroup: FormGroup;
  formControl: FormControl;
  controlName: string;
  value;
  private rowId: any;

  @ViewChild('targetInput', { read: ViewContainerRef }) public targetInput;

  getValue(): any {
    return this.value;
  }

  agInit(params: any): void {
    this.gridApi = params.api;
    this.controlName = params.column.colDef.field;
    this.rowId = params.node.id;
    this.refresh(params);
  }

  public ngAfterViewInit(): void {
    window.setTimeout(() => {
      if (this.targetInput) {
        this.targetInput.element.nativeElement.focus();
      }
    });
  }

  onValueChanged(newVal) {
    this.formGroup.controls[this.controlName].setValue(newVal);
    this.value = newVal;
  }

  refresh(params: any): boolean {
    this.formGroup = params.context.formGroup.controls[this.rowId];
    if (this.formGroup) {
      this.formControl = this.formGroup.get(this.controlName) as FormControl;
    }
    this.value = params.value;
    this.formGroup.controls[this.controlName].setValue(this.value);

    return true;
  }

  // TODO: Extract this to some sort of Error Service
  /*getErrors() {
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
  }*/
}
