import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.verifyUserLoggedIn()
  }

  verifyUserLoggedIn () {
    Auth.currentAuthenticatedUser()
      .then(user => this.isLoggedIn = true)
      .catch(err => this.isLoggedIn = false)
  }
}
