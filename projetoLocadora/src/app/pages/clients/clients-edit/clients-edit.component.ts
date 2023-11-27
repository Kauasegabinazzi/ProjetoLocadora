import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientList } from '../module/struct';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/services/client.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.scss']
})
export class ClientsEditComponent implements OnInit, OnDestroy {

  public estrutura: ClientList;
  public isEdit: boolean = false;

  public struct: ClientList = new ClientList();

  constructor(public formBuilder: UntypedFormBuilder, private service: ClientService, private router: Router) {
    const state = history.state;
    this.estrutura = state.estrutura;
    this.isEdit = state.isEdit;
  }

  public form!: FormGroup;

  ngOnInit(): void {
    this.createForm();

    if (this.isEdit == true) {
      this.form.controls['nome'].setValue(this.estrutura.name);
      this.form.controls['idade'].setValue(this.estrutura.age);
      this.form.controls['matricula'].setValue(this.estrutura.registration);
    }
  }

  ngOnDestroy(): void {

  }

  private createForm() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.maxLength(50)]],
      matricula: [0, [Validators.maxLength(50)]],
      idade: [0, [Validators.maxLength(50)]],
      data: ['', [Validators.maxLength(50)]],
    })
  }

  createorupdate(form: FormGroup) {

    if (this.isEdit == false) {
      this.struct.name = form.controls['nome'].value;
      this.struct.age = form.controls['idade'].value;
      this.struct.birthday = form.controls['data'].value;
      this.struct.registration = form.controls['matricula'].value;
      this.struct.usercreationdate = new Date();

      return this.service.ClientAdd(this.struct).subscribe(
        res => this.router.navigate(['/clientes']),
        error => error
      );
    }
    else {
      this.struct.name = form.controls['nome'].value;
      this.struct.age = form.controls['idade'].value;
      this.struct.birthday = form.controls['data'].value;
      this.struct.registration = form.controls['matricula'].value;
      this.struct.birthday = this.estrutura.birthday;
      this.struct.usercreationdate = this.estrutura.usercreationdate;

      return this.service.ClientEdit(this.estrutura.id, this.struct).subscribe(
        res => this.router.navigate(['/clientes']),
        error => error
      );
    }
  }
}
