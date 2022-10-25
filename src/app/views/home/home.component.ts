import { Component, OnInit } from '@angular/core';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  params = {
    headers: {},
    response: true, 
    queryStringParameters: {}
  }
  isLoggedIn = false;
  blogs = [{ title: "", text: "", author: ""}];

  constructor() { }

  ngOnInit(): void {
    this.getBlogs()
    Auth.currentAuthenticatedUser()
      .then(user => this.isLoggedIn = true)
      .catch(err => this.isLoggedIn = false)
  }

  getBlogs() {
    API.get("blogApi", "/blogs" + '/{proxy+}', this.params)
      .then((response: any) => {
        this.blogs = response.data
      })
      .catch((error: { response: any; }) => {
        console.log("error:",error.response);
    });
  }

}
