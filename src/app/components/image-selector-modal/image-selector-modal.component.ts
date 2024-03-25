import { Component, EventEmitter, Input, Output } from '@angular/core';
//import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image-selector-modal',
  templateUrl: './image-selector-modal.component.html',
  styleUrls: ['./image-selector-modal.component.css']
})
export class ImageSelectorModalComponent {
  @Input() images: string[] = [];
  @Output() imageSelected = new EventEmitter<string>();

  constructor(/*public bsModalRef: BsModalRef*/) {}

  selectImage(imageSrc: string) {
    this.imageSelected.emit(imageSrc);
    //this.bsModalRef.hide();
  }
}
