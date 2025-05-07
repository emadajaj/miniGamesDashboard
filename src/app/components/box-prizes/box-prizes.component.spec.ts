import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxPrizesTableComponent } from './box-prizes.component';

describe('BoxPrizesTableComponent', () => {
  let component: BoxPrizesTableComponent;
  let fixture: ComponentFixture<BoxPrizesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxPrizesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxPrizesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
