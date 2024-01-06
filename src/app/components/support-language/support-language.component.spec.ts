import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportLanguageComponent } from './support-language.component';

describe('SupportLanguageComponent', () => {
  let component: SupportLanguageComponent;
  let fixture: ComponentFixture<SupportLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportLanguageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
