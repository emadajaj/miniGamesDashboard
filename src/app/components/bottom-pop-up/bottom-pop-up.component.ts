// bottom-popup.component.ts
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-pop-up',
  templateUrl: './bottom-pop-up.component.html',
  styleUrls: ['./bottom-pop-up.component.css'],
  standalone:false
})
export class BottomPopUopComponent {
  isVisible = false; // Control visibility
  field1: string = '';
  field2: string = '';
  @Input() game: { [key: string]: string; } | undefined;;
  @Output() yesClicked = new EventEmitter<{ game: string; image: string }>();
  gameName : string = ""
  image : string = ""

  openPopup() {
    this.isVisible = true; // Show the popup
  }

  closePopup() {
    this.isVisible = false; // Hide the popup
  }

  confirm() {
    console.log('Field 1:' + this.field1);
    console.log('Field 2:' + this.field2);
    this.yesClicked.emit({ game: this.gameName, image: this.image });
    this.closePopup(); // Close the popup after confirmation
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
      const popupElement = document.querySelector('.popup');
      const targetElement = event.target as HTMLElement;
  
      // Check if the click was outside the popup
      if (this.isVisible && popupElement && !popupElement.contains(targetElement) && !targetElement.classList.contains('btn')) {
          this.closePopup(); // Close the popup
      }
  }
}