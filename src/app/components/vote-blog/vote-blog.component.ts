import { Component, OnInit, Input, Output } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { API, Auth } from 'aws-amplify';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vote-blog',
  templateUrl: './vote-blog.component.html',
  styleUrls: ['./vote-blog.component.scss']
})
export class VoteBlogComponent implements OnInit {
  @Input() likes:number = 0;
  @Input() dislikes:number = 0;
  @Input() votedBy:any = [];
  @Input() username:any = [];

  @Output() like = new EventEmitter();
  @Output() dislike = new EventEmitter();
  
  isLiked:any = null;
  voteCast:boolean = false;
  blogId:any = null;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItemId();
    setTimeout(() => {
      this.userAlreadyVoted()
    }, 500);
  }

  getItemId() {
    this.blogId = this.route.snapshot.paramMap.get('id');
  }

  userAlreadyVoted() {
    const user = this.votedBy.find((el:any) => el.name === this.username) 
    this.isLiked = user ? user.liked : ''
  }

  addNewVoter(name:string) {
    const userFound = this.votedBy.find((el:any) => el.name === this.username)
    const voter = {
      name: name,
      liked: this.isLiked
    }

    if(userFound) userFound.liked = this.isLiked
    else this.votedBy.push(voter)

    const votes = {
      likes: this.likes,
      dislikes: this.dislikes,
      votedBy: this.votedBy
    }
    this.like.emit(votes)
  }

  likeBlog () {
    // če je likan gumb pa kliknemo (deselect)
    if(this.isLiked && this.voteCast) {
      if(this.likes > 0) this.likes--
      this.isLiked = null;
      this.voteCast = false;
      return;
    } 

    // če je dislikan
    if(this.isLiked === false && this.voteCast) {
      if(this.dislikes > 0) this.dislikes--
      this.voteCast = false;
    }

    // ga poklikamo
    if(this.voteCast === false) {
      this.likes++;
      this.isLiked = true;
      this.voteCast = true;
    }

    // se updejta
    this.addNewVoter(this.username)

  }

  dislikeBlog () {
    // če je dislikan gumb pa kliknemo (deselect)
    if(this.isLiked === false && this.voteCast) {
      if(this.dislikes > 0) this.dislikes--
      this.isLiked = null;
      this.voteCast = false;
      return;
    } 
    // če je likan 
    if(this.isLiked && this.voteCast) {
      if(this.likes > 0) this.likes--
      this.voteCast = false;
    }

    // ga poklikamo
    if(this.voteCast === false) {
      this.dislikes++;
      this.isLiked = false;
      this.voteCast = true;
    }

    // se updejta
    this.addNewVoter(this.username)
  }
}
