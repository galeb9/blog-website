import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { Blog } from '../../components/blogs/Blog';
import { API, Auth } from 'aws-amplify';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit, AfterViewInit {
  itemId:any = null;

  isLoggedIn!: Boolean;
  author!: string;
  
  title!: string;
  description!: string;
  text!: string;

  constructor(private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkLoggedIn();
    this.itemId = this.getItemId();
  }

  ngAfterViewInit(): void {
    this.getBlog()
  }

  getItemId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
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
    if(this.text && this.title && this.description && this.isLoggedIn) {
      const newBlog = {
        title: this.title,
        text: this.text,
        description: this.description,
        author: this.author
      }

      this.editBlog(newBlog)
      
      this.title = ''
      this.text = ''
      this.description = ''
      this.author = ''

      this.route.navigate(['blogs'])
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

  editBlog(blog: any) {
    API.put("blogApi", "/blogs/" + + this.itemId, { body: blog })
      .then((response: any) => {
        console.log(response)
      })
      .catch((error: { response: any; }) => {
        console.log("error:", error.response);
    });
  }
  
  getBlog() {
    API.get("blogApi", "/blogs/" + this.itemId, {})
      .then((response: any) => {
        this.title = response.title;
        this.text = response.text;
        this.description = response.description;
      })
      .catch((error: { response: any; }) => {
        console.log("error:", error.response);
    });
  }
}
