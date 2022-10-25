import { Component, OnInit } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { Router } from '@angular/router'

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  blogs = [{ id: "1", title: "", description: "", text: "", author: ""}];

  params = {
    headers: {},
    response: true, 
    queryStringParameters: {}
  };

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.getBlogs()
  }

  getBlogs() {
    API.get("blogApi", "/blogs" + '/{proxy+}', this.params)
      .then((response: any) => {
        console.log(response.data)
        this.blogs = response.data
      })
      .catch((error: { response: any; }) => {
        console.log("error:",error.response);
    });
  }

  openBlog (blog: any) {
    this.router.navigateByUrl(`/blogs/${blog.id}`);
  }

}
