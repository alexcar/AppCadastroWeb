import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Usuario } from './usuario';
import { Filtro } from './filtro';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuarios: MatTableDataSource<Usuario>;
  public columnsToDisplay: string[] = ['nome', 'dataNascimento', 'email', 'senha', 'sexo', 'status', 'acoes'];

  filtroNome: '';
  filtroStatus: string;
  // filtro: Filtro;
  filtro = new Filtro();

  tiposStatus = [
    {
      statusId: 2,
      descricao: 'Todos'
    },
    {
    statusId: 1,
    descricao: 'Ativo'
    }, {
      statusId: 0,
      descricao: 'Inativo'
    }
  ];

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  openDialog(nome: string, id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.height = '300px';
    dialogConfig.data = nome;
    const dialogRef = this.matDialog.open(DialogUsuarioComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.delete(id);
        }
      });
  }

  getData() {
    const url = 'https://localhost:44391/api/usuario';

    this.http.get<any>(url)
        .subscribe(result => {
          this.usuarios = new MatTableDataSource<Usuario>(result);
        }, error => console.error(error));
  }

  delete(id: number) {
    const url = 'https://localhost:44391/api/usuario/' + id;
    this.http.delete(url)
      .subscribe(result => {
        this.openSnakBar();
        this.getData();
      }, error => console.log(error));
  }

  openSnakBar() {
    this.snackBar.openFromComponent(SnackBarMensagemComponent, {
      duration: 5000,
    });
  }

  filtrar() {
    const url = 'https://localhost:44391/api/usuario/search';
    this.filtro.nome = this.filtroNome;

    if (this.filtroStatus == '0') {
      this.filtro.ativo = false;
    } else if (this.filtroStatus == '1') {
      this.filtro.ativo = true;
    } else {
      this.filtro.ativo = null;
    }

    this.http.post<any>(url, this.filtro)
      .subscribe(result => {
        this.usuarios = new MatTableDataSource<Usuario>(result);
      }, error => console.error(error));
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


