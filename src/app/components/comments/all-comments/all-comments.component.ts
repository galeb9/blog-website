import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../blogs/Blog'
import { API, Auth } from 'aws-amplify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit {

  @Input() comments: Comment[] = []; 
  isLoggedIn!: boolean;
  author!: string;
  blogId:any = null;

  newComment!:string;
  commentOpen: boolean = false;

  newChainComment!:string;
  chainCommentOpen: boolean = false;
  // chainCommentOpen: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItemId();
    setTimeout(() => {
      this.checkLoggedIn();
    }, 400);
  }

  capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1)
  }

  getItemId() {
    this.blogId = this.route.snapshot.paramMap.get('id');
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
    // this.checkLoggedIn();
    this.commentOpen = true
  }

  createNewComment(newComment: any) {
    console.log("new:", newComment)
    const allComments = [...this.comments, newComment ]

    API.put("blogApi", "/blogs/" + this.blogId, { body: {comments: allComments} })
    .then((response: any) => {
        // console.log(response)
      })
      .catch((error: { response: any; }) => {
        console.log("error:", error.response);
        console.log(this.blogId);
      });
  }

  postComment(newComment: string) {
    this.newComment = this.capitalize(newComment)

    const comment = {
      author: this.author,
      text: this.newComment,
      replies: [],
      votedBy: [],
      likes: 0,
      dislikes: 0,
    }

    if(this.newComment) {
      this.createNewComment(comment);

      this.comments.push(comment);

      this.author = "";
      this.newComment = "";
      this.commentOpen = false;
    } else {
      alert("Please write a comment!!!")
    }
  }

  cancelComment() {
    this.commentOpen = false
    this.author = ""
    this.newComment = ""
  }

  // chain comments
  openChainComments() {
    this.chainCommentOpen = true;
  }
  closeChainComments() {
    this.chainCommentOpen = false;
  }

  addChainComment (currentComment: Comment) {
    const chainComment = {
      author: this.author,
      text: this.newChainComment,
      replies: [],
      votedBy: [],
      likes: 0,
      dislikes: 0,
    }
    currentComment.replies.push(chainComment)
    if(this.newChainComment) this.createNewComment(currentComment);
    else alert("Please comment on this comment")
  }

  // chain comment votes
  updateBlogVotes(votes: any) {
    console.log(votes)
  }

}
