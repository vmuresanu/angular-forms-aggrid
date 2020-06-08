import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CellInputRendererComponent } from './grid/cell-input-renderer/cell-input-renderer.component';
import { CellInputEditorComponent } from './grid/cell-input-editor/cell-input-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellInputRendererComponent,
    CellInputEditorComponent
  ],
  imports: [
    AgGridModule.withComponents([CellInputRendererComponent, CellInputEditorComponent]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
