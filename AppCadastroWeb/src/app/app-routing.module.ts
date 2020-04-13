import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditaUsuarioComponent } from './usuario/edita-usuario/edita-usuario.component';


const routes: Routes = [
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'usuario/:id', component: EditaUsuarioComponent },
  { path: 'usuario', component: EditaUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
