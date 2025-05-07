import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPlayersLogTableComponent } from './top-players-log.component';


describe('TopPlayersLogTableComponent', () => {
  let component: TopPlayersLogTableComponent;
  let fixture: ComponentFixture<TopPlayersLogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPlayersLogTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPlayersLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
