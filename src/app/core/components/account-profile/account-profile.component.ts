import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {ConteService} from '../account-setting/conte.service';
import {IConte} from '../../../models/conte.model';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  navClass = 'nav-light';
  email;
  firstname;
  ch: string;
  ressourceUrl = environment.serverUrl;
  public contes: IConte[] = [];
  constructor(private accountservice: AccountService, private conteService: ConteService) { }

  ngOnInit(): void {
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
        this.conteService.update(conte).subscribe();
    }
}
