import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../blogs/Blog'
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[] = []; 
  isLoggedIn!: boolean;
  author!: string;
  newComment!: string;
  commentOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1)
  }

  checkLoggedIn() {
    Auth.currentAuthenticatedUser()
      .then(user =>  {
        this.isLoggedIn = true
        this.author = user.username
      })
      .catch(()=> this.isLoggedIn = false)
  }

  commentOnBlog() {
    this.checkLoggedIn();
    this.commentOpen = true
  }

  postComment() {
    this.newComment = this.capitalize(this.newComment)

    const comment = {
      author: this.author,
      text: this.newComment
    }
    if(this.newComment) {
      this.comments.push(comment)
      this.author = ""
      this.newComment = ""
    } else {
      alert("Please write a comment!!!")
    }
    //connect to post to dynamoDB item
  }

  cancelComment() {
    this.commentOpen = false
    this.author = ""
    this.newComment = ""
  }
}
