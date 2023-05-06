import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitdefiComponent } from './invitdefi.component';

describe('InvitdefiComponent', () => {
  let component: InvitdefiComponent;
  let fixture: ComponentFixture<InvitdefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitdefiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitdefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
