import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreListComponent } from './score-list';

describe('ScoreList', () => {
  let component: ScoreListComponent;
  let fixture: ComponentFixture<ScoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
