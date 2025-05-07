import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameUsersLogTableComponent } from './game-users-log.component';


describe('GameUsersLogTableComponent', () => {
  let component: GameUsersLogTableComponent;
  let fixture: ComponentFixture<GameUsersLogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameUsersLogTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameUsersLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
