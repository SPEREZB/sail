import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherListComponent } from './admin-teacher-list.component';

describe('AdminTeacherListComponent', () => {
  let component: AdminTeacherListComponent;
  let fixture: ComponentFixture<AdminTeacherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeacherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
