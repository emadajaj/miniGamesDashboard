import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopUpWithDataComponent } from './pop-up-with-data.component';


describe('PopUpWithDataComponent', () => {
  let component: PopUpWithDataComponent;
  let fixture: ComponentFixture<PopUpWithDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpWithDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpWithDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
