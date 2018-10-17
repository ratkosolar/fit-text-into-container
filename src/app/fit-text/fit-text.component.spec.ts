import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FitTextComponent } from './fit-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FitTextDirective } from './fit-text.directive';
import { DebugElement } from '@angular/core';

describe('FitTextComponent', () => {
  let component: FitTextComponent;
  let fixture: ComponentFixture<FitTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        FitTextComponent,
        FitTextDirective
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find reactive form fields in DOM', () => {
    let ftDebug: DebugElement = fixture.debugElement;
    let ftTextInput = ftDebug.query(By.css('input[formControlName="outputDivText"]')).nativeElement;
    let ftWidthInput = ftDebug.query(By.css('input[formControlName="outputDivWidth"]')).nativeElement;

    expect(ftTextInput).toBeDefined();
    expect(ftWidthInput).toBeDefined();
  });

  it('should have working reactive form', () => {
    let ftDebug: DebugElement = fixture.debugElement;
    let ftTextInput = ftDebug.query(By.css('input[formControlName="outputDivText"]')).nativeElement;
    let ftWidthInput = ftDebug.query(By.css('input[formControlName="outputDivWidth"]')).nativeElement;

    // Component to View reflection
    component.form.get('outputDivText').patchValue('test new value 1');
    component.form.get('outputDivWidth').patchValue(200);

    expect(ftTextInput.value).toBe('test new value 1');
    expect(ftWidthInput.value).toBe('200');

    // View to Component reflection
    ftTextInput.value = 'test new value 2';
    ftWidthInput.value = '250';
    ftTextInput.dispatchEvent(new Event('input'));
    ftWidthInput.dispatchEvent(new Event('input'));

    expect(component.form.get('outputDivText').value).toBe('test new value 2');
    expect(component.form.get('outputDivWidth').value).toBe(250);
  }); 
  
  it('should load form values from sessionStorage', () => {
    // same values from previous test
    expect(component.form.get('outputDivText').value).toBe('test new value 2');
    expect(component.form.get('outputDivWidth').value).toBe(250);
  });

  it('should update output div width when formControl value changes', () => {
    let ftDebug: DebugElement = fixture.debugElement;
    let outputDiv: HTMLElement = ftDebug.query(By.css('.fit-text-output')).nativeElement;

    component.form.get('outputDivWidth').patchValue(300);
    fixture.detectChanges();
    expect(outputDiv.clientWidth).toBe(300);

    component.form.get('outputDivWidth').patchValue(150);
    fixture.detectChanges();
    expect(outputDiv.clientWidth).toBe(150);
  });

  it('should update output div text when formControl value changes', () => {
    let ftDebug: DebugElement = fixture.debugElement;
    let outputDivText: HTMLElement = ftDebug.query(By.css('.fit-text-output > span')).nativeElement;

    component.form.get('outputDivText').patchValue('test 1');
    fixture.detectChanges();
    expect(outputDivText.textContent).toContain('test 1');

    component.form.get('outputDivText').patchValue('test 2');
    fixture.detectChanges();
    expect(outputDivText.textContent).toContain('test 2');
  });
});
