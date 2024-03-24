import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent {

  @Input() url_param : string = "";
  @Input() id : number | undefined;
  @Input() isIcon : boolean = false;
  
}
