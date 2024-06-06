import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalDataService } from '../../services/modal-data.service';

@Component({
  selector: 'app-loading-wrapper',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading-wrapper.component.html',
  styleUrl: './loading-wrapper.component.css'
})
export class LoadingWrapperComponent implements OnInit {
  showLoadingScreen: boolean = false;

  constructor(private modalDataService: ModalDataService) { }

  ngOnInit(): void {
    this.modalDataService.showLoadingScreen$.subscribe((showLoadingScreen: boolean) => {
      this.showLoadingScreen = showLoadingScreen;
    });
  }
}
