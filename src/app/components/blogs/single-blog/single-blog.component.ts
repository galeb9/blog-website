import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {
  itemId:any = null;
  singleBlog:any;

  params = {
    headers: {},
    response: true, 
    queryStringParameters: {}
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemId = this.getItemId()
    this.getSingleBlog()
  }

  getItemId() {
    return this.route.snapshot.paramMap.get('id');
  }

  getSingleBlog() {
    API.get("blogApi", "/blogs" + '/{proxy+}', this.params)
      .then((response: any) => {
        const item = response.data.find((item: any) => item.id === this.itemId)
        this.singleBlog = item
        console.log(this.singleBlog)
      })
      .catch((error: { response: any; }) => {
        console.log("error:",error.response);
    });
  }

}
