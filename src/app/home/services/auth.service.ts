import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    criarHash(nome: string): number {
      const nomeLowerCase = nome; // Padroniza para minúsculas
      let nomeAscii = '';
  
      for (let i = 0; i < nomeLowerCase.length; i++) {
        const charCode = nomeLowerCase.charCodeAt(i);
        nomeAscii += charCode.toString() + '';
      }
  
      return parseInt(nomeAscii, 16);
    }
}
