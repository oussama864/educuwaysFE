import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {AuteurService} from "../../../services/auteur.service";
import {Auteur} from "../../../models/auteur.model";
import {Account} from "../../auth/account.model";

@Component({
  selector: 'app-account-payments',
  templateUrl: './account-payments.component.html',
  styleUrls: ['./account-payments.component.css']
})
export class AccountPaymentsComponent implements OnInit {
  navClass = 'nav-light';
  users: Auteur ;
  user: Account ;
    ch: string;
  constructor(private accountservice: AccountService, private  auteurService: AuteurService) { }


  ngOnInit(): void {

      this.users = JSON.parse(localStorage.getItem('auteur'));
      this.user = JSON.parse(localStorage.getItem('user'));
      this.ch = this.user.email;
this.auteurService.findByEmail(this.accountservice.userIdentity.email).subscribe((res) => {
  console.log(res.body);
})

  }
}
