import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FitTextService } from './fit-text.service';

@Component({
  selector: 'ft-fit-text',
  templateUrl: './fit-text.component.html',
  styleUrls: ['./fit-text.component.scss']
})
export class FitTextComponent implements OnInit {

  @ViewChild('outputDiv') outputDiv: ElementRef;

  outputDivMinWidth: number = 100;
  outputDivMaxWidth: number = 800;
  form: FormGroup = new FormGroup({
    outputDivText: new FormControl(''),
    outputDivWidth: new FormControl(this.outputDivMinWidth)
  });

  constructor(
    private fitTextService: FitTextService
  ) { }

  ngOnInit() {
    // Load data from storage on start
    this.loadStorageData();
    this.updateText();

    // Update output div text on form value change
    this.form.valueChanges.subscribe(val => {
      this.updateStorageData(val);
      this.updateText();
    });
  }

  private updateText(){
    setTimeout(() => {
      this.fitTextService.fitText(this.outputDiv.nativeElement);
    }, 1);
  }

  private loadStorageData(){
    let data = sessionStorage.getItem('fit-text-storage');
    if(data){
      this.form.patchValue(JSON.parse(data));
    }
  }

  private updateStorageData(data: any){
    sessionStorage.setItem('fit-text-storage', JSON.stringify(data));
  }

}
