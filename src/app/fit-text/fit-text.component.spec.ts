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
  
  it('should persist form data on reloads using sessionStorage', () => {
    // Update form value to trigger sessionStorage save
    component.form.patchValue({
      outputDivText: 'test storage value',
      outputDivWidth: 250
    });

    // Destroy and rebuild component
    fixture.destroy();
    fixture = TestBed.createComponent(FitTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Expect form values to be loaded from sessionStorage
    expect(component.form.get('outputDivText').value).toBe('test storage value');
    expect(component.form.get('outputDivWidth').value).toBe(250);
  });

  it('should update outputDiv.width when formControl value changes', () => {
    let ftDebug: DebugElement = fixture.debugElement;
    let outputDiv: HTMLElement = ftDebug.query(By.css('.fit-text-output')).nativeElement;

    component.form.get('outputDivWidth').patchValue(300);
    fixture.detectChanges();
    expect(outputDiv.clientWidth).toBe(300);

    component.form.get('outputDivWidth').patchValue(150);
    fixture.detectChanges();
    expect(outputDiv.clientWidth).toBe(150);
  });

  it('should update outputDiv text when formControl value changes', () => {
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
