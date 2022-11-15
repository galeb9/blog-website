import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChainCommentComponent } from './create-chain-comment.component';

describe('CreateChainCommentComponent', () => {
  let component: CreateChainCommentComponent;
  let fixture: ComponentFixture<CreateChainCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChainCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChainCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
