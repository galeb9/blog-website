import { Component, OnInit } from '@angular/core';
import { Blog } from '../../components/blogs/Blog'
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  isLoggedIn!: Boolean;
  author!: string;
  
  title!: string;
  description!: string;
  text!: string;

  constructor() { }

  ngOnInit(): void {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    Auth.currentAuthenticatedUser()
      .then(user =>  {
        this.isLoggedIn = true
        this.author = user.username
        console.log(user)
      })
      .catch(()=> this.isLoggedIn = false)
  }

  onSubmit() {
    if(this.text && this.title && this.description) {
      const newBlog = {
        title: this.title,
        text: this.text,
        description: this.description,
        author: this.author
      }

      this.createBlog(newBlog)
      // console.log(newBlog)
    } else {
      alert('Please add a title, description & blog text!')
    }
  }

  textareaBreak () {
    this.text += "<br>"
  }

  capitalize (text: string) {
    return text ? text[0].toUpperCase() + text.slice(1) : ""
  }

  createBlog(blog: any) {
    API.post("blogApi", "/blogs/" + "{proxy+}", {body: blog})
      .then((response: any) => {
        console.log("it happened")
      })
      .catch((error: { response: any; }) => {
        console.log("error:",error.response);
    });
  }

  addComment() {

  }

}
