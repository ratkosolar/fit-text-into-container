import { Directive, Renderer2, ElementRef, OnInit, AfterContentChecked, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[ftFitText]'
})
export class FitTextDirective implements OnInit, AfterViewChecked {

  element: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(){
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewChecked(){
    // Update text size after view is checked
    this.fitText(this.element);
  }

  /**
   * Fit text into container with maximum font size
   */
  fitText(containerSelector: string | HTMLElement){
    let container: HTMLElement;
    let text: HTMLElement

    // Initialize container element
    if(containerSelector instanceof HTMLElement){
      container = containerSelector;
    }else{
      container = document.querySelector(containerSelector);
      if(!container) return; // no container element found
    }

    // Find text element
    text = container.querySelector('span');
    if(!text) return; // no text element found

    // Calculate and apply max font size
    let maxFontSize = this.calculateMaxFontSize(container, text);
    this.updateElementFontSize(text, maxFontSize);
  }

  /**
   * Calculate maximum font size for text inside container 
   */
  private calculateMaxFontSize(container: HTMLElement, textElement: HTMLElement): number{
    // Container dimensions
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;

    // Text dimensions
    let textWidth = textElement.offsetWidth;
    let textHeight = textElement.offsetHeight;
    let textFontSize = this.calculateCurrentFontSize(textElement);

    // No text
    if(textWidth === 0){
      return 0;
    }

    // Calculate text to container dimensions ratio
    let widthRatio = containerWidth/textWidth;
    let heightRatio = containerHeight/textHeight;

    let maxFontSize = Math.min(widthRatio, heightRatio)*textFontSize;
    return Math.floor(maxFontSize);
  }

  /**
   * Calculate element current computed font size
   */
  private calculateCurrentFontSize(element: HTMLElement): number{
    let style = window.getComputedStyle(element);
    let fontSize = style.getPropertyValue('font-size');
    return parseInt(fontSize);
  }

  /**
   * Update element font size
   */
  private updateElementFontSize(element: HTMLElement, fontSize?: number){
    this.renderer.setStyle(
      element,
      'font-size',
      fontSize ? fontSize + 'px' : ''
    );
  }

}
