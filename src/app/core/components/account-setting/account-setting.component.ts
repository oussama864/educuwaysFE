import {Component, OnInit, TemplateRef} from '@angular/core';

import {FormBuilder} from '@angular/forms';
import {ConteService} from './conte.service';
import {Conte} from '../../../models/conte.model';
import {AccountService} from '../../../services/account.service';
import {Auteur} from "../../../models/auteur.model";
import {Account} from "../../auth/account.model";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Qcm} from "../../../models/qcm.model";



@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  users: Auteur ;
  items = [];
  closeResult: any;
  tabQCM :Qcm[] = [];



  private affectedType: Boolean | boolean;
  idReponse = 0;
  user: Account;
  editForm = this.fb.group({
    /*id: [],*/
    nom: [],
    Type: [],
    Description: [],
    Prix: [],
    langues: [],
    imgUrl: [],
    titre: [],
    Nombres_de_pages: [],
    MaisonEdition: [],
    /*createdBy: [],
    createdDate: [],
    deleted: [],
    deletedBy: [],
    deletedDate: [],
    auteur: [],
    competition: [],*/
  });
  qcmForm = this.fb.group({
    question:[],
  });
  constructor(
      protected conteService: ConteService,
      protected fb: FormBuilder,
      private accountservice: AccountService,
      protected modalService: NgbModal
  ) {}


  private dialogRef: any;
  private crudApi: any;
  private router: any;


  navClass = 'nav-light';
  userFile;
  imgUrl: any;
  public imagePath;
  public  message: string;


  // tslint:disable-next-line:typedef
  imgURL: any;


  ngOnInit(): void {
    this.users =this.accountservice.userIdentityAuteur;
    this.user = this.accountservice.userIdentity;

  }

  // tslint:disable-next-line:typedef
  oneSelectFile( event) {


    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      const mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imgUrl = reader.result;
      };
    }


  }
  // tslint:disable-next-line:typedef
  addData() {
    const formDataAb3Ath = new  FormData();
    const conte  = this.createFromForm();
    formDataAb3Ath.append('conte', JSON.stringify(conte));
    formDataAb3Ath.append('file', this.userFile);
    this.conteService.createConteWithImage(formDataAb3Ath).subscribe( data => {

      this.router.navigate(['/conte']);
    });
  }
  // tslint:disable-next-line:typedef
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id, this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.router.navigate(['/conte']);
    });
  }

  save(): void {

   // const conte = this.createFromForm();
    // this.conteService.create(conte).subscribe();
    this.addData();
  }


  // tslint:disable-next-line:typedef
  public item: string;
  public i: any;
  private valid: any;

  private createFromForm() {
    console.log(this.accountservice.userIdentityAuteur);
    return {
        ...new Conte(),
        type: this.editForm.get(['Type'])!.value,
        description: this.editForm.get(['Description'])!.value,
        prix: this.editForm.get(['Prix'])!.value,
        language: this.editForm.get(['langues'])!.value,
        imageUrl: this.editForm.get(['imgUrl'])!.value,
        titre: this.editForm.get(['titre'])!.value,
        nbPage: this.editForm.get(['Nombres_de_pages'])!.value,
        maisonEdition: this.editForm.get(['MaisonEdition'])!.value,
      emailAuteur : this.accountservice.userIdentity.email,

      };
  }



  deleteItem(id, i: number) {
    this.items.splice(i, 1);
  }

  createItemou() :void{
    let valid = true;

    this.items.forEach((item, i) => {
      const reponse = (<HTMLInputElement>document.getElementById('reponse' + item.id)).value;
      this.items[i].value.reponse = reponse;
      if ( reponse === null ){
        valid = false;
      }
    });
    console.log(this.items)
    if (valid) {

      if(this.items.length < 4){

        this.items.push({id: this.idReponse, value: { reponse: null}});
        this.idReponse++;
      }
    }else {
      console.log('veuillez remplir Svp .');
    }
  }

  /* ajouter Qcm oussama*/


  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass" }).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
    );
  }


  private getDismissReason(reason: any) :string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  saveQCM() {
    this.items.forEach((item, i) => {
      const reponse = (<HTMLInputElement>document.getElementById('reponse' + item.id)).value;
      this.items[i].value.reponse = reponse;
    });
    const question = this.qcmForm.get(["question"])!.value;
    this.items.forEach(value => {
      console.log(value);
    });
    this.items = [];
    this.idReponse = 0;
  }
}




