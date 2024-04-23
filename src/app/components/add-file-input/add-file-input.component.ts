import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-add-file-input',
  standalone: true,
  imports: [],
  templateUrl: './add-file-input.component.html',
  styleUrl: './add-file-input.component.css'
})
export class AddFileInputComponent {
@Input() inputValue: File;

  constructor(inputValue: File) {
    this.inputValue = inputValue;
  }
}
