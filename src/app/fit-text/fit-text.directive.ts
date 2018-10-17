import { Directive, Renderer2, ElementRef, OnInit, AfterContentChecked, AfterViewChecked } from '@angular/core';

export interface FTContainer{
  element: HTMLElement,
  width?: number,
  height?: number
}

export interface FTText{
  element: HTMLElement,
  width?: number,
  height?: number,
  fontSize?: number
  fontSizeIncrement?: number
}

@Directive({
  selector: '[ftFitText]'
})
export class FitTextDirective implements OnInit, AfterViewChecked {

  element: HTMLElement;
  container: FTContainer;
  text: FTText;

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

  fitText(containerSelector: string | HTMLElement, textElement?: HTMLElement, prevFontSizeIncrement?: number): boolean{
    this.container = {element: null};
    this.text = {element: null};
    let isRecursive = false;

    // Initialize fitText method params
    let initialized = this.initParams(containerSelector, textElement);
    if(!initialized) 
      return false;

    // Calculate current styles for container and text
    this.calculateStyles();

    // Check if text is empty
    if(!this.text.width) 
      return false;

    // Font size increment (+1, -1 or 0)
    if(prevFontSizeIncrement){
      isRecursive = true;
      this.text.fontSizeIncrement = prevFontSizeIncrement;
    }else{
      this.calculateFontSizeIncrement();
      if(this.text.fontSizeIncrement == 0) 
        return true;
    }

    // Check if ideal font size is reached
    if(isRecursive && this.idealFontSizeReached()) 
      return true;
    
    // Apply new font size
    this.renderer.setStyle(
      this.text.element, 
      'font-size', 
      this.text.fontSize + this.text.fontSizeIncrement + 'px'
    );
    
    // Recursive call until ideal font size reached
    return this.fitText(
      this.container.element, 
      this.text.element, 
      this.text.fontSizeIncrement
    );
  }

  private initParams(containerSelector: string | HTMLElement, textElement?: HTMLElement): boolean{
    // Check if HTMLElement is passed directly
    if(containerSelector instanceof HTMLElement){
      this.container.element = containerSelector;
    }else{
      this.container.element = document.querySelector(containerSelector);
    }

    // Validate if container element exists
    if(!this.container.element){
      console.log('Element %s not found in DOM', containerSelector);
      return false;
    }

    // Check if textElement is passed
    if(textElement){
      this.text.element = textElement;
    }else{
      this.text.element = this.container.element.querySelector('span');
    }
    
    // Validate if text element exists
    if(!this.text.element){
      console.warn('Text element found in DOM');
      return false;
    }

    return true;
  }

  private calculateStyles(){
    this.container.width = this.container.element.clientWidth;
    this.container.height = this.container.element.clientHeight;
    this.text.width = this.text.element.offsetWidth;
    this.text.height = this.text.element.offsetHeight;
    this.text.fontSize = parseInt(window.getComputedStyle(this.text.element).getPropertyValue('font-size').replace('px', ''));
  }

  private calculateFontSizeIncrement(){
    if(this.text.width > this.container.width || this.text.height > this.container.height){
      // current text is too big, decrease font by 1 
      this.text.fontSizeIncrement = -1;
    }else if(this.text.width < this.container.width){
      // current text is too small, increase font by 1
      this.text.fontSizeIncrement = 1;
    }else if(this.text.width == this.container.width || this.text.height == this.container.height){
      // current text already fits
      this.text.fontSizeIncrement = 0;
    }
  }

  private idealFontSizeReached(): boolean{
    if(this.text.fontSize <= 1){
      // Reached too small font
      return true;
    } 
    
    // Positive increment (trying to increase font until max)
    if(this.text.fontSizeIncrement > 0){
      if(this.text.width > this.container.width || this.text.height > this.container.height){
        // Overreached max font size, decrease by 1
        this.renderer.setStyle(
          this.text.element, 
          'font-size', 
          this.text.fontSize - this.text.fontSizeIncrement + 'px'
        );
        return true;
      }else if(this.text.width == this.container.width || this.text.height == this.container.height){
        // Reached fitting size
        return true;
      }
    } 
    
    // Negative increment (trying to decrease font until it fits)
    if(this.text.fontSizeIncrement < 0){ 
      if(this.text.width <= this.container.width && this.text.height <= this.container.height){
        // Reached fitting size
        return true;
      }
    }

    return false;
  }

}
