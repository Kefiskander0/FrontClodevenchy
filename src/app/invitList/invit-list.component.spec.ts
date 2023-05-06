import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitListComponent } from './invit-list.component';

describe('InvitListComponent', () => {
  let component: InvitListComponent;
  let fixture: ComponentFixture<InvitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
