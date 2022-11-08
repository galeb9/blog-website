import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { API, Auth } from 'aws-amplify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote-blog',
  templateUrl: './vote-blog.component.html',
  styleUrls: ['./vote-blog.component.scss']
})
export class VoteBlogComponent implements OnInit {
  @Input() likes:number = 0;
  @Input() dislikes:number = 0;
  @Input() likedBy:any = [];
  @Input() username:any = [];
  
  isLiked:any = null;
  voteCast:boolean = false;
  blogId:any = null;
  hasVoted:any = null;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItemId();
    console.log(this.likedBy)
    setTimeout(() => {
      this.userAlreadyVoted(this.likedBy, this.username)
    }, 1000);
  }
  userAlreadyVoted(arr:any , a:string) {
    const user = arr.filter((el:string) => el === a)
    console.log(user)
  }

  getItemId() {
    this.blogId = this.route.snapshot.paramMap.get('id');
  }

  updateVotes() {
    let newVoters = this.likedBy ? [...this.likedBy, this.username] : [this.username]  
    const votes = {
      likes: this.likes,
      dislikes: this.dislikes,
      votedBy: newVoters
    }

    API.put("blogApi", "/blogs/" + this.blogId, { body: votes })
      .then((response: any) => {
        console.log(response)
        console.log("successfully voted")
      })
      .catch((error: { response: any }) => {
        console.log("error:", error.response);
        console.log(this.blogId)
      });
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
    this.updateVotes()
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
    this.updateVotes()
  }
}
