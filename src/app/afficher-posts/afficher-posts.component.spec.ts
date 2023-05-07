import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherPostsComponent } from './afficher-posts.component';

describe('AfficherPostsComponent', () => {
  let component: AfficherPostsComponent;
  let fixture: ComponentFixture<AfficherPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
