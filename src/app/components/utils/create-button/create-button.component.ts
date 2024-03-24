import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.css']
})
export class CreateButtonComponent {

  @Input() url_param : string = "";
  @Input() isIcon : boolean = false;

}
