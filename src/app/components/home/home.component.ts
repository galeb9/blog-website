import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';

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


  constructor() { }

  ngOnInit(): void {

  }

  getBlogs() {
    // add godamn /{proxy+}
    API.get("blogApi", "/blogs" + '/{proxy+}', this.params)
      .then((response: any) => {
        console.log(response)
      })
      .catch((error: { response: any; }) => {
        console.log("error:",error.response);
    });
  }

}
