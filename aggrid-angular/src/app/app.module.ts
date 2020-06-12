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
import { CellSelectRendererComponent } from './grid/cell-select-renderer/cell-select-renderer.component';
import { CellSelectEditorComponent } from './grid/cell-select-editor/cell-select-editor.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    AgGridModule.withComponents([
      CellInputRendererComponent,
      CellInputEditorComponent,
      CellSelectRendererComponent,
      CellSelectEditorComponent,
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    GridComponent,
    CellInputRendererComponent,
    CellInputEditorComponent,
    CellSelectRendererComponent,
    CellSelectEditorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
