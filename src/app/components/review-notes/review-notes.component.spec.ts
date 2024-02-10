import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewNotesComponent } from './review-notes.component';

describe('ReviewNotesComponent', () => {
  let component: ReviewNotesComponent;
  let fixture: ComponentFixture<ReviewNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
