import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from '../usuario';
import { Sexo } from '../sexo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edita-usuario',
  templateUrl: './edita-usuario.component.html',
  styleUrls: ['./edita-usuario.component.css']
})
export class EditaUsuarioComponent implements OnInit {

  title: string;
  form: FormGroup;
  usuario: Usuario;
  id?: number;
  sexos: Sexo[];
  tiposStatus = [{
      statusId: true,
      descricao: 'Ativo'
    }, {
      statusId: false,
      descricao: 'Inativo'
    }
  ];

  constructor(
    private actovatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      usuarioId: new FormControl(''),
      nome: new FormControl('', [Validators.minLength(3), Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      senha: new FormControl('', Validators.required),
      ativo: new FormControl(''),
      sexoId: new FormControl('', Validators.required)
    });

    this.loadData();
  }

  loadData() {
    this.loadSexos();
    this.id = +this.actovatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      // modo edição
      const url = 'https://localhost:44391/api/usuario/' + this.id;
      this.http.get<Usuario>(url)
        .subscribe(result => {
          this.usuario = result;
          this.title = 'Editar - ' + this.usuario.nome;

          this.form.patchValue(this.usuario);
        }, error => console.error(error));
    } else {
      // modo adição
      this.title = 'Insere um novo Usuário';
    }
  }

  loadSexos() {
    const url = 'https://localhost:44391/api/sexo';
    this.http.get<Sexo[]>(url)
      .subscribe(result => {
        this.sexos = result;
      }, error => console.error(error));
  }

  onSubmit() {
    const usuario = (this.id) ? this.usuario : {} as Usuario;

    usuario.nome = this.form.get('nome').value;
    usuario.dataNascimento = this.form.get('dataNascimento').value;
    usuario.email = this.form.get('email').value;
    usuario.senha = this.form.get('senha').value;
    usuario.ativo = this.form.get('ativo').value === 'true' ? true : false;
    usuario.sexoId = +this.form.get('sexoId').value;

    if (this.id) {
      // modo edição
      const url = 'https://localhost:44391/api/usuario/' + this.usuario.usuarioId;
      this.http
        .put<Usuario>(url, usuario)
          .subscribe(result => {
            this.openSnakBar();
            this.router.navigate(['/usuarios']);
          }, error => console.log(error));
      } else {
        // modo adição
        const url = 'https://localhost:44391/api/usuario/';
        this.http.post<Usuario>(url, usuario)
          .subscribe(result => {
            this.openSnakBar();

            this.router.navigate(['/usuarios']);
          }, error => console.log(error));
      }
    }

    openSnakBar() {
      this.snackBar.openFromComponent(SnackBarMensagemComponent, {
        duration: 5000,
      });
    }
}

@Component({
  selector: 'app-snack-bar-mensagem-component',
  template: `<span class='estilo'>Ação realizada com sucesso!</span>`,
  styles: [`
    .estilo {
      color: hotpink;
    }
  `],
})
export class SnackBarMensagemComponent { }
