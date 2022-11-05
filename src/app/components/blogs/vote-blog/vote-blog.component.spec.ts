import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteBlogComponent } from './vote-blog.component';

describe('VoteBlogComponent', () => {
  let component: VoteBlogComponent;
  let fixture: ComponentFixture<VoteBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
