import { Component, OnInit } from '@angular/core';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  blogs = [{ title: "", description: "", text: "", author: ""}];

  params = {
    headers: {},
    response: true, 
    queryStringParameters: {}
  };

  constructor() { }

  ngOnInit(): void {
    this.getBlogs()
    this.verifyUserLoggedIn()
  }

  verifyUserLoggedIn () {
    Auth.currentAuthenticatedUser()
      .then(user => this.isLoggedIn = true)
      .catch(err => this.isLoggedIn = false)
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

}
