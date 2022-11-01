import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.log(Auth.currentSession())
    this.checkLoggedIn()
  }
  
  checkLoggedIn () {
    
    onAuthUIStateChange((state, user) => {
      console.log(state)
      if(state === AuthState.SignedIn) {
        console.log(user)
      } else {
        console.log("Not logged in")
      }
    })
  } 
}
