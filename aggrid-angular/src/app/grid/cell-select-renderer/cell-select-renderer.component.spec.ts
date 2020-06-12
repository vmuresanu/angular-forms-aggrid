import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellSelectRendererComponent } from './cell-select-renderer.component';

describe('CellSelectRendererComponent', () => {
  let component: CellSelectRendererComponent;
  let fixture: ComponentFixture<CellSelectRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellSelectRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellSelectRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
