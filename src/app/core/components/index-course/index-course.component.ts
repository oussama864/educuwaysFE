import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {RegisterService} from '../../../auth/auth-signup/register.service';
import {Router} from '@angular/router';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-index-course',
  templateUrl: './index-course.component.html',
  styleUrls: ['./index-course.component.css']
})
export class IndexCourseComponent implements OnInit {
  constructor(private modalService: NgbModal, private  registerService: RegisterService, private router: Router,
              private accountService: AccountService) { }
  navClass = 'nav-light';
  showNavigationArrows = false;
  showNavigationIndicators = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    },
    nav: false
  };

  ngOnInit(): void {
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'lg', centered: true });
  }


  signUpAuteur(): void {
    this.registerService.registreType = 'auteur';
    this.router.navigateByUrl('/auth-signup');

  }


  signUpEcole(): void {
    this.registerService.registreType = 'ecole';
    this.router.navigateByUrl('/auth-signup');
  }

  signUpEcolier(): void {
    this.registerService.registreType = 'ecolier';
    this.router.navigateByUrl('/auth-signup');
  }

  signInAuteur(): void {
    this.registerService.registreType = 'auteur';
    this.router.navigateByUrl('/auth-login');

  }

  signInEcole(): void {
    this.registerService.registreType = 'ecole';
    this.router.navigateByUrl('/auth-login');
  }

  signInEcolier(): void{
    this.registerService.registreType = 'ecolier';
    this.router.navigateByUrl('/auth-login');
  }

    checkConnection(): void {
        console.log(this.accountService.isAuthenticated());
    }
}
