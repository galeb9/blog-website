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
  @Input() blogAuthor: string = "";
  isLoggedIn!: boolean;
  author!: string;
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
    setTimeout(() => {
      this.checkLoggedIn();
    }, 400);
  }

  toggle(item:boolean) {
    item = !item
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

  isCommentAuthor(commentAuthor: string) {
    return this.author === commentAuthor
  }

  isBlogAuthor() {
    return this.author === this.blogAuthor
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

      this.newComment = "";
      this.commentOpen = false;
      console.log("posted comment")
    } else {
      alert("Please write a comment!!!")
    }
  }

  postChainComment (newComment: string, currentComment: Comment, toggleIndex: number) {
    const chainComment = {
      author: this.author,
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
  updateBlogVotes(votes: any) {
    console.log(votes) 
  }

  updateReplayVotes(data: any) {
    // this.updateComments(this.comments)
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
