import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ft-fit-text',
  templateUrl: './fit-text.component.html',
  styleUrls: ['./fit-text.component.scss']
})
export class FitTextComponent implements OnInit {

  outputDivMinWidth: number = 100;
  outputDivMaxWidth: number = 800;
  form: FormGroup = new FormGroup({
    outputDivText: new FormControl(''),
    outputDivWidth: new FormControl(this.outputDivMinWidth)
  });

  constructor() { }

  ngOnInit() {
    // Load form data from storage on start
    this.loadStorageData();

    // Update storage on form value change
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
