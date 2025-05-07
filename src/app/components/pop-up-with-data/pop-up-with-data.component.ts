import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up-with-data',
  templateUrl: './pop-up-with-data.component.html',
  styleUrls: ['./pop-up-with-data.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class PopUpWithDataComponent{
  inputPrice:number =0

  @Input() message: string = '';
  @Output() yesClicked = new EventEmitter<number>();
  @Output() noClicked = new EventEmitter<void>();
  @Output() price = new EventEmitter<number>();

  isVisible: boolean = false;

  show() {
      this.isVisible = true;
  }

  hide() {
      this.isVisible = false;
  }

  onYes() {
      this.yesClicked.emit(this.inputPrice);
      this.hide();
  }

  onNo() {
      this.noClicked.emit();
      this.hide();
  }

}