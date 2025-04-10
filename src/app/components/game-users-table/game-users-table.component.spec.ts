import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameUsersTableComponent } from './game-users-table.component';


describe('GameUsersTableComponent', () => {
  let component: GameUsersTableComponent;
  let fixture: ComponentFixture<GameUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameUsersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
