import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Filtro } from './filtro';

@Injectable()
export class FiltroService {
    private filtroInterno = new BehaviorSubject(new Filtro());
    filtro = this.filtroInterno.asObservable();

    constructor() {}

    alteracaoFiltro(filtro: Filtro) {
        this.filtroInterno.next(filtro);
    }
}