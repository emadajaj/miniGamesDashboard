import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingAwardsTableComponent } from './ranking-awards.component';


describe('RankingAwardsTableComponent', () => {
  let component: RankingAwardsTableComponent;
  let fixture: ComponentFixture<RankingAwardsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingAwardsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingAwardsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
