import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameViewerComponent } from './game-viewer';

describe('GameViewer', () => {
  let component: GameViewerComponent;
  let fixture: ComponentFixture<GameViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
