import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {ConteService} from '../account-setting/conte.service';








@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  navClass = 'nav-light';
  email;
  constructor(private accountservice: AccountService, private conteservice: ConteService) { }

  ngOnInit(): void {
    this.email = this.accountservice.userIdentity.email;
           /*console.log(this.accountservice.userIdentity);*/
    this.conteservice.getMyContes(this.email).subscribe();
  }


}
