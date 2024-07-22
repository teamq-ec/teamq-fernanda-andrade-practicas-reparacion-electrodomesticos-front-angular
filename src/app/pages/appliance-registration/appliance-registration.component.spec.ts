import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceRegistrationComponent } from './appliance-registration.component';

describe('ApplianceRegistrationComponent', () => {
  let component: ApplianceRegistrationComponent;
  let fixture: ComponentFixture<ApplianceRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplianceRegistrationComponent]
    });
    fixture = TestBed.createComponent(ApplianceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
