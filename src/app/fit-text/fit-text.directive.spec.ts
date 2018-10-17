import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, ViewChild } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FitTextDirective } from './fit-text.directive';

@Component({
  template: `
    <div 
      class="fit-text-output" 
      ftFitText
      style="width: 100px; height: 50px; border: 1px solid #ccc;">
      <span style="line-height: 1; white-space: nowrap;">{{text}}</span>
    </div>` 
})
class TestFitTextComponent {
  text: string = 'test';
}

describe('FitTextDirective', () => {
  let testComponent: TestFitTextComponent;
  let testFixture: ComponentFixture<TestFitTextComponent>;
  let testComponentDebugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestFitTextComponent,
        FitTextDirective
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestFitTextComponent);
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();
    testComponentDebugEl = testFixture.debugElement;
  });

  it('should create test component', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should fit variable length text inside container with maximum font size', () => {
    let container: HTMLElement = testComponentDebugEl.query(By.css('.fit-text-output')).nativeElement;
    let text: HTMLElement = testComponentDebugEl.query(By.css('.fit-text-output > span')).nativeElement;
    let prevFontSize: number, currentFontSize: number;

    // Small length text
    testComponent.text = 'small text testing';
    testFixture.detectChanges();
    currentFontSize = parseInt(window.getComputedStyle(text).getPropertyValue('font-size').replace('px', ''));

    expect(text.offsetWidth).toBeLessThanOrEqual(container.clientWidth);
    expect(text.offsetHeight).toBeLessThanOrEqual(container.clientHeight);

    // Medium length text after small length text
    testComponent.text = 'medium text testing testing';
    testFixture.detectChanges();
    prevFontSize = currentFontSize;
    currentFontSize = parseInt(window.getComputedStyle(text).getPropertyValue('font-size').replace('px', ''));

    expect(text.offsetWidth).toBeLessThanOrEqual(container.clientWidth);
    expect(text.offsetHeight).toBeLessThanOrEqual(container.clientHeight);
    expect(currentFontSize).toBeLessThan(prevFontSize); // more text should make the font smaller


    // Large length text after medium length text
    testComponent.text = 'large text testing testing testing testing';
    testFixture.detectChanges();
    prevFontSize = currentFontSize;
    currentFontSize = parseInt(window.getComputedStyle(text).getPropertyValue('font-size').replace('px', ''));

    expect(text.offsetWidth).toBeLessThanOrEqual(container.clientWidth);
    expect(text.offsetHeight).toBeLessThanOrEqual(container.clientHeight);
    expect(currentFontSize).toBeLessThan(prevFontSize); // more text should make the font smaller


    // Medium length text after large length text
    testComponent.text = 'medium text testing testing';
    testFixture.detectChanges();
    prevFontSize = currentFontSize;
    currentFontSize = parseInt(window.getComputedStyle(text).getPropertyValue('font-size').replace('px', ''));

    expect(text.offsetWidth).toBeLessThanOrEqual(container.clientWidth);
    expect(text.offsetHeight).toBeLessThanOrEqual(container.clientHeight);
    expect(currentFontSize).toBeGreaterThan(prevFontSize); // less text should make the font bigger


    // Small length text after medium length text
    testComponent.text = 'small text testing';
    testFixture.detectChanges();
    currentFontSize = parseInt(window.getComputedStyle(text).getPropertyValue('font-size').replace('px', ''));

    expect(text.offsetWidth).toBeLessThanOrEqual(container.clientWidth);
    expect(text.offsetHeight).toBeLessThanOrEqual(container.clientHeight);
    expect(currentFontSize).toBeGreaterThan(prevFontSize); // less text should make the font bigger
  });
});
