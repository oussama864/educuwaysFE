import { Component, OnInit } from '@angular/core';

import {Conte} from './conte.model';
import {FormBuilder} from '@angular/forms';
import {ConteService} from './conte.service';



@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
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
  constructor(
      protected conteService: ConteService,
      protected fb: FormBuilder
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
  private createFromForm() {

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
      };
    }
  }




