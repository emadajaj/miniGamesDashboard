import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamePrizesTableComponent } from './game-prizes.component';


describe('GamePrizesTableComponent', () => {
  let component: GamePrizesTableComponent;
  let fixture: ComponentFixture<GamePrizesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePrizesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePrizesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
