import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeCardsTableComponent } from './like-cards-table.component';


describe('LikeCardsTableComponent', () => {
  let component: LikeCardsTableComponent;
  let fixture: ComponentFixture<LikeCardsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeCardsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeCardsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
