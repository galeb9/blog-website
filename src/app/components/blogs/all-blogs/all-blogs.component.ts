import { Component, OnInit, Input } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { Blog } from '../Blog';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  @Input() blogsLimit: number = 0 
  blogs: Blog[] = []

  params = {
    headers: {},
    response: true, 
    queryStringParameters: {}
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getBlogs()
  }

  limitBlogs() {
    const limitedBlogs = []
    if(this.blogsLimit > 0 && this.blogs.length > 0) {
      for(let i = 0; i < this.blogsLimit; i++) {
        limitedBlogs.push(this.blogs[i])
      }
      this.blogs = limitedBlogs
    }
  }

  getBlogs() {
    API.get("blogApi", "/blogs/", this.params)
      .then((response: any) => {
        this.blogs = response.data
        this.limitBlogs()
      })
      .catch((error: { response: any; }) => {
        console.log("error:",error.response);
    });
  }

  openBlog (blog: any) {
    this.router.navigateByUrl(`/blogs/${blog.id}`);
  }

}
