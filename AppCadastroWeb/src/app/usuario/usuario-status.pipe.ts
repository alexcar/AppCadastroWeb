import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioStatus'
})
export class UsuarioStatusPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value === true) {
      return 'Ativo';
    } else {
      return 'Inativo';
    }
  }
}
