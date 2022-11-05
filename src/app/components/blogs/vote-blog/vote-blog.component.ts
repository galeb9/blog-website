import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vote-blog',
  templateUrl: './vote-blog.component.html',
  styleUrls: ['./vote-blog.component.scss']
})
export class VoteBlogComponent implements OnInit {
  @Input() likes:number = 0;
  @Input() dislikes:number = 0;
  
  isLiked:any = null;
  voteCast:boolean = false;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor() { }

  ngOnInit(): void {
  }

  // Connect to Amplify api (save like or dislike)
  likeBlog () {
    if(this.isLiked === true && this.voteCast === true) {
      this.isLiked = null;
      this.likes--;
      this.voteCast = false;
      return;
    } 
    if(this.isLiked === false) {
      this.dislikes--;
      this.voteCast = false;
    }
    if(this.voteCast === false) {
      this.isLiked = true;
      this.likes++;
      this.voteCast = true;
    }
  }

  dislikeBlog () {
    if(this.isLiked === false && this.voteCast === true) {
      this.isLiked = null;
      this.dislikes--;
      this.voteCast = false;
      return;
    } 
    if(this.isLiked) {
      this.likes--;
      this.voteCast = false;
    }
    if(this.voteCast === false) {
      this.isLiked = false;
      this.dislikes++;
      this.voteCast = true;
    }
  }
}
