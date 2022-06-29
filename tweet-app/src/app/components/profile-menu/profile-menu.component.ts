import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.less']
})
export class ProfileMenuComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.userService.userLogOut();
  }

}
