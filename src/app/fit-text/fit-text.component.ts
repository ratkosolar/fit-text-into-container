import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FitTextDirective } from './fit-text.directive';

@Component({
  selector: 'ft-fit-text',
  templateUrl: './fit-text.component.html',
  styleUrls: ['./fit-text.component.scss']
})
export class FitTextComponent implements OnInit {

  @ViewChild(FitTextDirective) outputDiv: FitTextDirective;

  outputDivMinWidth: number = 100;
  outputDivMaxWidth: number = 800;
  form: FormGroup = new FormGroup({
    outputDivText: new FormControl(''),
    outputDivWidth: new FormControl(this.outputDivMinWidth)
  });

  constructor() { }

  ngOnInit() {
    // Load data from storage on start
    this.loadStorageData();

    // Update output div text on form value change
    this.form.valueChanges.subscribe(val => {
      this.updateStorageData(val);
    });
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
