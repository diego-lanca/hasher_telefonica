import { AuthService } from "./auth.service";
import { HomeComponent } from "../home.component";

export class ContatoService {
    contatos = new Map<number, Contato>();

    adicionarContato(contato: Contato) {
        this.contatos.set(contato.pos, contato);
    }

    getContatos(pos?: number): any {
        if (pos === undefined) {
            return this.contatos;
        }
        return this.contatos.get(pos);
    }

    setPos(arg: Contato): any {
      
        // Se for um objeto Contato, calcule a posição
        let position = arg.hash % 100;
      
        while (this.contatos.has(position)) {
            position++;
            const hash = arg.hash.toString() + 'A';
            arg.hash = hash;
        }
      
        return position;
      }

      getPos(nome: string): any {
        
        const hash = AuthService.prototype.criarHash(nome)
        
         // Se for um objeto Contato, calcule a posição
        if (isNaN(hash)) {
            alert('hash is NaN');
            return NaN;
        }
      
        // Se for um objeto Contato, calcule a posição
        let position = hash % 100;
      
        return position;
      }
}

export class Contato {

    nome: string;
    telefone: string;
    endereco: string;
    hash: any;
    pos: number = 0;
    next: any = null;


    constructor(nome: string, telefone: string, endereco: string, contatoService: ContatoService) {
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.hash = AuthService.prototype.criarHash(this.nome);

        this.pos = contatoService.setPos(this);
    }

}

export function setInTable(contato: Contato, tb: any) {
    tb.set(contato.pos, contato)
}