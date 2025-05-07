import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MileStonesTableComponent } from './mile-stones.component';


describe('MileStonesTableComponent', () => {
  let component: MileStonesTableComponent;
  let fixture: ComponentFixture<MileStonesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MileStonesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MileStonesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
