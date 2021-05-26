import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {AuteurService} from "../../../services/auteur.service";

@Component({
  selector: 'app-account-payments',
  templateUrl: './account-payments.component.html',
  styleUrls: ['./account-payments.component.css']
})
export class AccountPaymentsComponent implements OnInit {
  navClass = 'nav-light';
  constructor(private accountservice: AccountService, private  auteurService: AuteurService) { }


  ngOnInit(): void {
this.auteurService.findByEmail(this.accountservice.userIdentity.email).subscribe((res) => {
  console.log(res.body);
})
  }
}
