import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class FitTextService {

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2
  ) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  fitText(elementSelector: string | HTMLElement, textElement?: HTMLElement, fontSizeIncrement?: number){
    let element: HTMLElement,
        text: HTMLElement,
        elementWidth: number,
        elementHeight: number,
        textWidth: number,
        textHeight: number,
        textFontSize: number,
        isRecursive: boolean = false;

    // Check if HTMLElement is passed directly
    if(elementSelector instanceof HTMLElement){
      element = elementSelector;
    }else{
      element = document.querySelector(elementSelector);
    }

    // Check if textElement is passed
    if(textElement){
      text = textElement;
    }else{
      text = element.querySelector('span');
    }

    // Validation errors
    if(!element){
      console.error('Element or text not found in DOM');
      return;
    }
    if(!text){
      console.error('Text not found in DOM');
      return;
    }

    // Calculate current styles
    elementWidth = element.offsetWidth;
    elementHeight = element.offsetHeight;
    textWidth = text.offsetWidth;
    textHeight = text.offsetHeight;
    textFontSize = parseInt(window.getComputedStyle(text).getPropertyValue('font-size'));

    // Empty text
    if(!textWidth){
      return;
    }

    let textFontSizeIncrement;
    if(fontSizeIncrement){
      isRecursive = true;
      textFontSizeIncrement = fontSizeIncrement;
    }else{
      // Calculate increment (done only once)
      if(textWidth > elementWidth || textHeight > elementHeight){
        // text too big, decrease font by 1
        textFontSizeIncrement = -1;
      }else if(textWidth < elementWidth){
        // text too small, increase by 1
        textFontSizeIncrement = 1;
      }else if(elementWidth == textWidth || elementHeight == textHeight){
        // text already fits
        textFontSizeIncrement = 0;
      }
    }

    // Check if goal reached
    if(isRecursive){
      if(textFontSize <= 1){
        // Reached too small font
        return;
      }else if(textFontSizeIncrement > 0 && (textWidth > elementWidth || textHeight > elementHeight)){
        // Text too big, decrease font size by 1
        this.renderer.setStyle(text, 'font-size', textFontSize - textFontSizeIncrement + 'px');
        return;
      }else if(textFontSizeIncrement < 0 && textWidth < elementWidth && textHeight < elementHeight){
        // Reached fitting size
        return;
      }
    }
    

    // Apply new font size
    if(textFontSizeIncrement){
      console.log('Element width = %s\nText width = %s\nText font size = %s\nFont size increment = %s', elementWidth, textWidth, textFontSize, textFontSizeIncrement);
      this.renderer.setStyle(text, 'font-size', textFontSize + textFontSizeIncrement + 'px');
      this.fitText(element, text, textFontSizeIncrement);
    }
  }

}
