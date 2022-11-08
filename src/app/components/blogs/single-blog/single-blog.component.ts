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
  itemId:any = null;
  blog:any;

  params = {
    headers: {},
    response: true, 
    queryStringParameters: {}
  };

  constructor(private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.itemId = this.getItemId();
    this.getSingleBlog();
    this.getUsername();
    // console.log(new Date().toISOString());
  }

  getItemId() {
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
    API.get("blogApi", "/blogs/" + this.itemId, {})
      .then((response: any) => {
        this.blog = response;
      })
      .catch((error: { response: any; }) => {
        console.log("error:", error.response);
    });
  }

  editBlog() {
    this.route.navigate([`blogs/edit-blog/${this.itemId}`])
  }

  deleteSingleBlog () {
    API.del("blogApi", "/blogs/" + this.itemId, {})
    .then((response: any) => {
      this.route.navigate(['blogs'])
    })
    .catch((error: { response: any; }) => {
      console.log("error:", error.response);
    });
  }
}
