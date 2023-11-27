import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    criarHash(nome: string): number {

        let nomeAscii = ''

        for (let i = 0; i< nome.length; i++) {
            const charCode = nome.charCodeAt(i);
            nomeAscii += charCode.toString() + '';
        }

        return parseInt(nomeAscii, 16);
    }
}