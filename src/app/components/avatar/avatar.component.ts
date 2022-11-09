import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() author: string = "a";
  authorLetter!: string;

  constructor() { }

  ngOnInit(): void {
    this.authorLetter = this.firstLetter(this.author || "H");
  }

  firstLetter (str: string) {
    return str[0].toUpperCase() 
  }

}
