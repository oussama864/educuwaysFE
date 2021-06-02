import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {ConteService} from "../account-setting/conte.service";
import {AuteurService} from "../../../services/auteur.service";
import {Account} from "../../auth/account.model";
import {Auteur} from "../../../models/auteur.model";
import {IConte} from "../../../models/conte.model";

@Component({
  selector: 'app-account-works',
  templateUrl: './account-works.component.html',
  styleUrls: ['./account-works.component.css']
})
export class AccountWorksComponent implements OnInit {
  navClass = 'nav-light';
  user: Account;
  users: Auteur ;
  email;
  firstname;
  ch: string;
  public contes: IConte[] = [];
  items = [];
  private affectedType: Boolean | boolean;
  private idBorderau: any;

  constructor(private accountservice: AccountService, private conteService: ConteService, private  auteurService: AuteurService) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('auteur'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.ch = this.user.email;
    this.conteService.getMyContes(this.ch).subscribe((res) => {
      this.contes = res.body;
    });
    this.email = this.user.email;
  }

  createItem() {
    let valid = true;
    this.items.forEach((item, i) => {
      const premierBorderau = (<HTMLInputElement>document.getElementById('premierBorderau' + item.id)).value;
      const dernierBordereau = (<HTMLInputElement>document.getElementById('dernierBordereau' + item.id)).value;
      this.items[i].value.premierBorderau = premierBorderau;
      this.items[i].value.dernierBordereau = dernierBordereau;
      if (premierBorderau === null || dernierBordereau === null ){
        valid = false;
      }
    });
    console.log(this.items)
    if (valid){
      this.items.push({id: this.idBorderau, value: {typeBorderau: null, premierBorderau: null, dernierBordereau: null}});
      this.idBorderau++;
    }else {
      console.log('veuillez remplir Svp .');
    }
  }


    deleteItem(id, i: number) {

    }
}
