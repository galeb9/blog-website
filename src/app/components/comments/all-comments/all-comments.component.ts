import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../blogs/Blog'
import { API } from 'aws-amplify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit {
  @Input() comments: Comment[] = []; 
  @Input() blogAuthor: string = "";
  @Input() username: string = "";

  isLoggedIn: boolean = false;
  blogId:any = null;

  newComment!:string;
  commentOpen: boolean = false;

  newChainComment!:string;
  chainCommentOpen: boolean = false;
  // chainCommentOpen: boolean = true;

  toggleReplies: any = {};
  toggleComments: any = {};
  toggleEditComment: any = {};
  toggleEditReplay: any = {};

  // edit comments
  isEditing: boolean = false;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItemId();
    this.sortByUpvotes(this.comments);
    console.log(this.username)
    // this.checkLoggedIn();
    setTimeout(() => {
    this.checkLoggedIn();
      
    }, 1000);
  }

  toggle(item:boolean) {
    item = !item;
  }

  sortByUpvotes(comments:any) {
    comments = comments.sort((a:any, b:any) =>  b.likes - a.likes);
  }

  capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1)
  }

  getItemId() {
    this.blogId = this.route.snapshot.paramMap.get('id');
  }

  checkLoggedIn() {
    if(this.username) this.isLoggedIn = true;
    console.log("logged in?", this.isLoggedIn)
  }

  isCommentAuthor(commentAuthor: string) {
    return this.username === commentAuthor
  }

  isBlogAuthor() {
    return this.username === this.blogAuthor
  }


  updateComments(newData: any) {
    if(newData) {
      API.put("blogApi", "/blogs/" + this.blogId, { body: {comments: newData} })
      .then((response: any) => {
        console.log(response)
      })
      .catch((error: { response: any; }) => {
        console.log("error:", error.response);
        console.log(this.blogId);
      });
    }
  }

  commentOnBlog() {
    this.commentOpen = true
  }

  cancelComment() {
    this.commentOpen = false
    this.newComment = ""
  }

  createNewComment(newComment: any) {
    const allComments = [...this.comments, newComment ]
    this.updateComments(allComments)
  }

  postComment(newComment: string) {
    this.newComment = this.capitalize(newComment)

    const comment = {
      author: this.username,
      text: this.newComment,
      replies: [],
      votedBy: [],
      likes: 0,
      dislikes: 0,
    }

    if(this.newComment) {
      this.createNewComment(comment);

      this.comments.push(comment);

      this.newComment = "";
      this.commentOpen = false;
      console.log("posted comment")
    } else {
      alert("Please write a comment!!!")
    }
  }

  postChainComment (newComment: string, currentComment: Comment, toggleIndex: number) {
    const chainComment = {
      author: this.username,
      text: newComment,
      replies: [],
      votedBy: [],
      likes: 0,
      dislikes: 0,
    }

    if(newComment) {
      currentComment.replies.push(chainComment)
      this.updateComments(this.comments)
      this.toggleReplies[toggleIndex] = 0;
    } 
    else alert("Please comment on this comment")
  }

  // chain comment votes
  updateCommentVotes(votes: any, comment: any) {
    let findCommentIndex = this.comments.indexOf(comment);
    if (findCommentIndex !== -1) {
      comment = {...comment,...votes};
      this.comments.splice(findCommentIndex, 1, comment);
      this.updateComments(this.comments)
    }
  }

  updateReplayVotes(votes: any, mainComment: any, chainComment: any) {
    let findReplayIndex = this.comments.indexOf(mainComment);
    if (findReplayIndex !== -1) {
      const chainIndex = this.comments[findReplayIndex].replies.indexOf(chainComment)
      this.comments[findReplayIndex].replies[chainIndex] = {...chainComment,...votes}; 
      this.updateComments(this.comments)
    }
  }

  // edit comment
  editComment(commentIndex:number) {
    // this.updateComments(this.comments)
    this.toggleEditComment[commentIndex] = false; 
  }

  editReplay(commentIndex:number) {
    // this.updateComments(this.comments)
    this.toggleEditReplay[commentIndex] = false; 
  }

  deleteComment(comments:any, comment:any) {
    let index = comments.indexOf(comment);
    if (index !== -1) {
      comments.splice(index, 1);
      // this.updateComments(this.comments);
    }
  }
}
