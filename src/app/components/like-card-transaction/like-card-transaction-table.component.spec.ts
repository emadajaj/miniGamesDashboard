import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeCardTransactionTableComponent } from './like-card-transaction-table.component';


describe('LikeCardTransactionTableComponent', () => {
  let component: LikeCardTransactionTableComponent;
  let fixture: ComponentFixture<LikeCardTransactionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeCardTransactionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeCardTransactionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
