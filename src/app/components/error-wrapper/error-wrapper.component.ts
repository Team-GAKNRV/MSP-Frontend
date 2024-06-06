import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomError } from '../../interfaces/error.interface';
import { ModalDataService } from '../../services/modal-data.service';

@Component({
  selector: 'app-error-wrapper',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error-wrapper.component.html',
  styleUrl: './error-wrapper.component.css'
})
export class ErrorWrapperComponent implements OnInit {
  showError: boolean = false;
  error: CustomError = { title: 'Fehler!', message: 'Ein unbekannter Fehler ist aufgetreten. Bitte versuche es noch einmal.' };

  constructor(private modalDataService: ModalDataService) { }

  ngOnInit(): void {
    this.modalDataService.error$.subscribe(errorData => {
      if (errorData) {
        this.showError = true;
        this.error = errorData;
      }
    });
  }

  handleCloseError() {
    this.showError = false;
  }
}
