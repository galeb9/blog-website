import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API, Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {
  username:string = '';
  blogId:any = null;
  blog:any;

  isLiked:any = null;
  voteCast:boolean = false;
  hasVoted:any = null;

  params = {
    headers: {},
    response: true, 
    queryStringParameters: {}
  };

  constructor(private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.blogId = this.getblogId();
    this.getSingleBlog();
    this.getUsername();
    // console.log(new Date().toISOString());
  }

  getblogId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  getUsername() {
    Auth.currentAuthenticatedUser()
      .then(user =>  {
        this.username = user.username;
      })
      .catch((err)=> console.log(err));
  }

  getSingleBlog() {
    API.get("blogApi", "/blogs/" + this.blogId, {})
      .then((response: any) => {
        this.blog = response;
      })
      .catch((error: { response: any; }) => {
        console.log("error:", error.response);
    });
  }

  editBlog() {
    this.route.navigate([`blogs/edit-blog/${this.blogId}`])
  }

  deleteSingleBlog () {
    API.del("blogApi", "/blogs/" + this.blogId, {})
    .then((response: any) => {
      this.route.navigate(['blogs'])
    })
    .catch((error: { response: any; }) => {
      console.log("error:", error.response);
    });
  }

  clearComments() {
    API.put("blogApi", "/blogs/" + this.blogId, { body: {comments: []} })
    .then((response: any) => {
        // console.log(response)
      })
      .catch((error: { response: any; }) => {
        console.log("error:", error.response);
        console.log(this.blogId);
      });
  }

  
  updateBlogVotes(votes:any) {
    // let newVoters = this.blog.votedBy ? [...this.blog.votedBy] : [this.username]  
    console.log(votes)

    API.put("blogApi", "/blogs/" + this.blogId, { body: votes })
      .then((response: any) => {
        console.log(response)
        console.log("successfully voted")
      })
      .catch((error: { response: any }) => {
        console.log("error:", error.response);
      });
  }
}
