import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPopUopComponent } from './bottom-pop-up.component';

describe('BottomPopUopComponent', () => {
  let component: BottomPopUopComponent;
  let fixture: ComponentFixture<BottomPopUopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomPopUopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomPopUopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
