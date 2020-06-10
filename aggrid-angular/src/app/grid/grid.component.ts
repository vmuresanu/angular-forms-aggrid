import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CellInputRendererComponent } from './cell-input-renderer/cell-input-renderer.component';
import { CellInputEditorComponent } from './cell-input-editor/cell-input-editor.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  gridReady$ = new Subject();
  formGroup = new FormGroup({});
  gridApi: GridApi;
  colApi: ColumnApi;

  columnDefs: ColDef[] = [
    {
      headerName: 'Make',
      field: 'make',
      cellRendererFramework: CellInputRendererComponent,
      cellEditorFramework: CellInputEditorComponent,
      sortable: true,
      filter: true,
      editable: true,
      singleClickEdit: true
    },
    {
      headerName: 'Model',
      field: 'model',
      cellRendererFramework: CellInputRendererComponent,
      cellEditorFramework: CellInputEditorComponent,
      sortable: true,
      filter: true,
      editable: true,
      singleClickEdit: true
    },
    {
      headerName: 'Price',
      field: 'price',
      cellRendererFramework: CellInputRendererComponent,
      cellEditorFramework: CellInputEditorComponent,
      sortable: true,
      filter: true,
      editable: true,
      singleClickEdit: true
    },
    {
      headerName: 'Start Date',
      field: 'startDate',
      sortable: true,
      filter: true,
      editable: true,
      singleClickEdit: true
    },
    {
      headerName: 'End Date',
      field: 'endDate',
      cellRendererFramework: CellInputRendererComponent,
      cellEditorFramework: CellInputEditorComponent,
      sortable: true,
      filter: true,
      editable: true,
      singleClickEdit: true
    }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000, startDate: '2020-03-05', endDate: '2020-04-05' },
    { make: 'Ford', model: 'Mondeo', price: 32000, startDate: '2020-03-05', endDate: '2020-04-05' },
    { make: '', model: 'Boxter', price: 72000, startDate: '2020-03-05', endDate: '2020-04-05' }
  ];

  gridOptions: GridOptions = {
    onGridReady: this.onGridReady.bind(this)
  };

  get gridReady() {
    console.log(this.gridApi)
    return this.gridApi
  }

  constructor() {
  }

  ngOnInit(): void {
    this.gridReady$
      .subscribe(() => {
        let columns = this.colApi.getAllColumns();
        //this.colApi.getAllColumns().forEach(c => c.get
        this.gridApi.forEachNode((node: RowNode) => {
          const innerFormGroup = new FormGroup({
            make: new FormControl(node.data.make, Validators.required),
            model: new FormControl(node.data.model),
            price: new FormControl(node.data.price),
            startDate: new FormControl(node.data.startDate),
            endDate: new FormControl(node.data.endDate),
          });
          this.formGroup.addControl(node.id, innerFormGroup);
        });
        console.log(this.formGroup);
        this.gridApi.refreshCells({ force: true });
        this.gridApi.sizeColumnsToFit();
      })
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`
      Formgroup isValid: ${this.formGroup.valid}
      Formgroup value: ${JSON.stringify(this.formGroup.value)}
     `);
  }

  onGridReady(e: GridReadyEvent) {
    console.log(e)
    this.gridApi = e.api;
    this.colApi = e.columnApi;
    this.gridReady$.next();
    this.gridReady$.complete();
  }

  getContext() {
    return {
      formGroup: this.formGroup
    }
  }

}
