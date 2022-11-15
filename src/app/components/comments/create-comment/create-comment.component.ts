import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
  @Input() author!:string;
  @Output() createNewComment:EventEmitter<string> = new EventEmitter<string>();

  newComment!:string;

  constructor() { }

  ngOnInit(): void {
  }

  postComment () {
    this.createNewComment.emit(this.newComment)
  }
}
