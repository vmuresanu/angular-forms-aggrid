import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellSelectEditorComponent } from './cell-select-editor.component';

describe('CellSelectEditorComponent', () => {
  let component: CellSelectEditorComponent;
  let fixture: ComponentFixture<CellSelectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellSelectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellSelectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
