import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = "Blog";
  isLoggedIn: any = null;

  links = [
    {text: "Home", path: "", loginGuard: false},
    {text: "Blogs", path: "blogs", loginGuard: false},
    {text: "Add blog", path: "add-blog", loginGuard: true}
  ]

  username: string = "";
  password: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLoggedIn()
  }

  capitalize(str: string) {
    str = str.toLowerCase()
    return str[0].toUpperCase + str.slice(1)
  }

  hasRoute(route: string) { // for limit routing
    return this.router.url === route;
  }

  checkLoggedIn() {
    Auth.currentAuthenticatedUser()
      .then(user =>  this.isLoggedIn = true)
      .catch(()=> this.isLoggedIn = false)
  }

  async signIn() {
    if(this.username && this.password) {
      Auth.signIn(this.username, this.password).then(user => console.log(user))
    }
  }
  
  async signOut() {
    try {
        await Auth.signOut();
        setTimeout(() => {
          this.checkLoggedIn()
        }, 1000);
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  getToken() {
    Auth.currentSession().then(res=>{
      let accessToken = res.getAccessToken()
      let jwt = accessToken.getJwtToken()
      //You can print them to see the full objects
      console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
      console.log(`myJwt: ${jwt}`)
    })
  }
}
