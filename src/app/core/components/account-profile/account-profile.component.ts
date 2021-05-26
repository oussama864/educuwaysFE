import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {ConteService} from '../account-setting/conte.service';
import {IConte} from '../../../models/conte.model';
import {environment} from '../../../../environments/environment';
import {AuteurService} from "../../../services/auteur.service";
import {Account} from "../../auth/account.model";
@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  navClass = 'nav-light';
  user: Account;
  email;
  firstname;
  ch: string;
  ressourceUrl = environment.serverUrl;
  public contes: IConte[] = [];
  constructor(private accountservice: AccountService, private conteService: ConteService, private  auteurService: AuteurService ) { }

  ngOnInit(): void {
      this.user = this.accountservice.userIdentity;
     this.ch = this.accountservice.userIdentity.email;
     this.conteService.getMyContes(this.ch).subscribe((res) => {
      this.contes = res.body;
    });
     this.email = this.accountservice.userIdentity.email;
     this.firstname = this.accountservice.userIdentityAuteur;
           /*console.log(this.accountservice.userIdentity);*/
   /*this.conteservice.getMyContes(this.email).subscribe();*/
  }




    participer(conte: IConte) {

        conte.readyForCompetetion = true;
        conte.readyForCompetitionDate = new Date();
        this.conteService.update(conte).subscribe(() => {
            this.auteurService.findByEmail(this.accountservice.userIdentity.email).subscribe((res) => {
                const auteur = res.body ;
                auteur.points = auteur.points - 100;
                console.log('hhh');
                this.auteurService.update(auteur).subscribe();
            });
        });
    }
}
