import {
  ChangeDetectorRef,
  Component,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import Popper from 'popper.js';

@Component({
  selector: 'app-cell-select-editor',
  templateUrl: './cell-select-editor.component.html',
  styleUrls: ['./cell-select-editor.component.scss']
})
export class CellSelectEditorComponent {

  @Input() model;
  @Input() labelKey = 'label';
  @Input() idKey = 'id';
  @Input() options = [];
  @Input() optionTpl: TemplateRef<any>;
  @Output() selectChange = new EventEmitter();
  @Output() closed = new EventEmitter();

  visibleOptions = 5;
  searchControl = new FormControl();

  private view: EmbeddedViewRef<any>;
  private popperRef: Popper;
  private originalOptions = [];

  constructor(private vcr: ViewContainerRef, private zone: NgZone, private cdr: ChangeDetectorRef) {}

  get isOpen() {
    return !!this.popperRef;
  }

  ngOnInit() {
    this.originalOptions = [...this.options];
    if (this.model !== undefined) {
      this.model = this.options.find(currentOption => currentOption[this.idKey] === this.model);
    }

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
      )
      .subscribe(term => this.search(term));
  }

  get label() {
    return this.model ? this.model[this.labelKey] : 'Select...';
  }

  open(dropdownTpl: TemplateRef<any>, origin: HTMLElement, isOpen: boolean) {
    if (isOpen) {
      this.close();
      return;
    }
    this.view = this.vcr.createEmbeddedView(dropdownTpl);
    const dropdown = this.view.rootNodes[0];

    document.body.appendChild(dropdown);
    dropdown.style.width = `${origin.offsetWidth}px`;

    this.zone.runOutsideAngular(() => {
      this.popperRef = new Popper(origin, dropdown, {
        removeOnDestroy: true
      });
    });

    this.handleClickOutside();
  }

  close() {
    this.closed.emit();
    this.popperRef.destroy();
    this.view.destroy();
    this.searchControl.patchValue('');
    this.view = null;
    this.popperRef = null;
  }

  select(option) {
    this.model = option;
    this.selectChange.emit(option[this.idKey]);
    this.close();
    // the handleClickOutside function will close the dropdown
  }

  isActive(option) {
    if (!this.model) {
      return false;
    }
    return option[this.idKey] === this.model[this.idKey];
  }

  search(value: string) {
    this.options = this.originalOptions.filter(option => option[this.labelKey].includes(value));
    requestAnimationFrame(() => (this.visibleOptions = this.options.length || 1));
  }

  private handleClickOutside() {
    fromEvent(document, 'click')
      .pipe(
        filter(({ target }) => {
          const origin = this.popperRef.reference as HTMLElement;
          return origin.contains(target as HTMLElement) === false;
        }),
        takeUntil(this.closed)
      )
      .subscribe(() => {
        this.close();
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {}

}
