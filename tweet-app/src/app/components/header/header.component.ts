import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showProfileMenu = false;
  @ViewChild('profileMenuIcon') profileMenuIcon!: ElementRef;

  constructor(private userService: UserService, private router: Router, private ref: ElementRef) { 
    // Listen to user login info
    userService.isUserLoggedIn().subscribe(flag => {
      this.isLoggedIn = flag;
      if(!flag) {
        this.router.navigate(['/user/login']);
      }
    });
  }

  ngOnInit(): void {
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  hideProfileMenuIfOpen(event: any) {
    const targetElement: HTMLElement = event.target as HTMLElement;
    if(targetElement && targetElement == this.profileMenuIcon.nativeElement) {
      return;
    }
    
    return this.toggleProfileMenu();
  }

}
