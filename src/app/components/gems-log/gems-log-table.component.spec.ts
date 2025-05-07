import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GemsLogTableComponent } from './gems-log-table.component';


describe('GemsLogTableComponent', () => {
  let component: GemsLogTableComponent;
  let fixture: ComponentFixture<GemsLogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GemsLogTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GemsLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
