import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class PopUpComponent{

  @Input() message: string = '';
  @Output() yesClicked = new EventEmitter<void>();
  @Output() noClicked = new EventEmitter<void>();

  isVisible: boolean = false;

  show() {
      this.isVisible = true;
  }

  hide() {
      this.isVisible = false;
  }

  onYes() {
    this.yesClicked.emit();
      this.hide();
  }

  onNo() {
      this.noClicked.emit();
      this.hide();
  }

}