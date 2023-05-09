import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontSideBarComponent } from './front-side-bar.component';

describe('FrontSideBarComponent', () => {
  let component: FrontSideBarComponent;
  let fixture: ComponentFixture<FrontSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
