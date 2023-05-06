import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectEventComponent } from './affect-event.component';

describe('AffectEventComponent', () => {
  let component: AffectEventComponent;
  let fixture: ComponentFixture<AffectEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
