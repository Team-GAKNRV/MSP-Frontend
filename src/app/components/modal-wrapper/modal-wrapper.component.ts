import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-wrapper.component.html',
  styleUrl: './modal-wrapper.component.css'
})
export class ModalWrapperComponent {
  @Input() showModal: boolean = false;
}
