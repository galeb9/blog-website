import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-chain-comment',
  templateUrl: './create-chain-comment.component.html',
  styleUrls: ['./create-chain-comment.component.scss']
})
export class CreateChainCommentComponent implements OnInit {
  @Input() author!:string;
  @Output() createNewChainComment:EventEmitter<string> = new EventEmitter<string>();
  newChainComment!:string;

  constructor() { }

  ngOnInit(): void {
  }

  addChainComment () {
    this.createNewChainComment.emit(this.newChainComment);
  }
}
