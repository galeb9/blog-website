import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   console.log(Auth.currentSession())
  }
}
