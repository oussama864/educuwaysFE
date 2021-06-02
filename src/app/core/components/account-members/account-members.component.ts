import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {ConteService} from "../account-setting/conte.service";
import {AuteurService} from "../../../services/auteur.service";
import {Auteur} from "../../../models/auteur.model";
import {Account} from "../../auth/account.model";

@Component({
  selector: 'app-account-members',
  templateUrl: './account-members.component.html',
  styleUrls: ['./account-members.component.css']
})
export class AccountMembersComponent implements OnInit {
  navClass = 'nav-light';
  users: Auteur ;
  user: Account;
  constructor(private accountservice: AccountService, private conteService: ConteService, private  auteurService: AuteurService ) { }

  ngOnInit(): void {this.users =this.accountservice.userIdentityAuteur;
    this.user = this.accountservice.userIdentity;
  }


}
