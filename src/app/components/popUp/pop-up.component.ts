import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { Game, GameColumn, GameData, GamesService } from '../../stores/games-managment-store/games.services';
import { GameUsersService, UserData } from '../../stores/games-users-managment-store/games-users.services';

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