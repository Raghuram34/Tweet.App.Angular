import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/iuser';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.less']
})
export class AllUsersComponent implements OnInit {
  allUsers: IUser[] = [];

  constructor(private userService: UserService, 
    private router: Router,
    private toastMessageService: ToastMessageService) {
    userService.sendRequestToGetAllUsers().subscribe(users => {
      this.allUsers = users as IUser[];
    },
    (error) => {
      toastMessageService.createToastMessage("Some error occurred. Please try again sometime.")
    })
  }

  ngOnInit(): void {
  }

  viewTweetsById(id: any) {
    this.router.navigate([`view-tweets/${id}`]);
  }
}
