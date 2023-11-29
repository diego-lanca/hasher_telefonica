import { AuthService } from './auth.service';
import { HomeComponent } from '../home.component';

export class ContatoService {
  // Mapa principal para armazenar os contatos
  contatos = new Map<number, Contato>();

  // Função para adicionar um contato ao mapa
  adicionarContato(contato: Contato) {
    this.contatos.set(contato.pos, contato);
  }

  // Função para retornar todos os contatos ou um contato específico
  getContatos(pos?: number): any {
    if (pos === undefined) {
      return this.contatos;
    }
    return this.contatos.get(pos);
  }

  // Função para calcular a posição de um contato e ajustar o hash do contato se a posição já estiver ocupada
  setPos(arg: Contato): any {
    let position = arg.hash % 1000;

    while (this.contatos.has(position)) {
      const existingContact = this.contatos.get(position);
      if (existingContact && existingContact.hash === arg.hash) {
        // Se o hash do contato existente é o mesmo, significa que já temos esse contato
        arg.hash += 'A';
        position++;
      }
      else {
        
        break;
      }
    }

    // Adiciona o contato à posição calculada
    this.contatos.set(position, arg);
    return position;
  }

  // Função para calcular a posição de um contato com base em seu nome
  getPos(nome: string): any {
    const hash = AuthService.prototype.criarHash(nome);

    if (isNaN(hash)) {
      alert('hash is NaN');
      return NaN;
    }

    let position = hash % 1000;

    return position;
  }
}

export class Contato {
  nome: string;
  telefone: string;
  endereco: string;
  hash: any;
  pos: number = 0;

  // Construtor para criar um novo contato
  constructor(
    nome: string,
    telefone: string,
    endereco: string,
    contatoService: ContatoService
  ) {
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.hash = AuthService.prototype.criarHash(this.nome); // Cria um hash a partir do nome
    this.pos = contatoService.setPos(this); // Define a posição do contato
  }
}

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;