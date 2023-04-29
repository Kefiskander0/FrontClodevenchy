import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyptoComponent } from './cypto.component';

describe('CyptoComponent', () => {
  let component: CyptoComponent;
  let fixture: ComponentFixture<CyptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyptoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
