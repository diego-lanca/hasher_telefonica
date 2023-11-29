import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contato, ContatoService } from '../home/services/hashTable.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <section>
      <!-- Menu de botões -->
      <div class="menu">
        <div class="menuBotoes">
          <button class="primary" type="button" (click)="mostrarInput()">
            Buscar Contato
          </button>
          <button
            class="primary"
            type="button"
            id="contato_new"
            (click)="adicionarContatoShow()"
          >
            Adicionar Contato
          </button>
          <button
            class="primary"
            type="button"
            id="list_load"
            (click)="listLoad()"
          >
            Carregar Lista
          </button>
        </div>
      </div>

      <!-- Conteúdo principal -->
      <div class="conteudo">
        <!-- Container para busca de contatos -->
        <div id="inputContainer" class="centralTexto">
          <form
            [formGroup]="buscarContatoForm"
            (ngSubmit)="buscarContato()"
            class="formContainer"
          >
            <label>
              <input
                type="text"
                formControlName="nome"
                placeholder="Nome"
                id="nomeBuscar"
              />
            </label>
            <button
              type="submit"
              [disabled]="buscarContatoForm.invalid"
              class="secondary"
            >
              Buscar
            </button>
          </form>

          <!-- Detalhes do contato encontrado -->
          <div class="dadosContato" *ngIf="detalhesContato">
            <img src="assets/contato.png" id="contatoImg" />
            <h1>{{ detalhesContato.nome }}</h1>
            <h4>{{ detalhesContato.telefone }}</h4>
            <h4>{{ detalhesContato.endereco }}</h4>

            <!-- Navegação entre contatos encontrados -->
            <div class="moreContacts" *ngIf="contactsFound.length > 1">
              <div class="botaoAnterior" *ngIf="currentContactIndex > 0">
                <button
                  type="button"
                  (click)="contatoAnterior()"
                  class="secondary"
                >
                  Anterior
                </button>
              </div>
              <div
                class="botaoProximo"
                *ngIf="currentContactIndex < contactsFound.length - 1"
              >
                <button
                  type="button"
                  (click)="proximoContato()"
                  class="secondary"
                >
                  Próximo
                </button>
              </div>
            </div>

            <!-- Botão para excluir contato -->
            <div class="excluirContato">
              <button
                type="button"
                (click)="excluirContato()"
                class="secondary"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>

        <!-- Formulário para adicionar novo contato -->
        <div id="addContato">
          <form [formGroup]="meuFormulario" (ngSubmit)="addContact()">
            <label>
              <input type="text" formControlName="nome" placeholder="Nome" />
            </label>
            <label>
              <input
                type="text"
                formControlName="telefone"
                placeholder="Telefone"
              />
            </label>
            <label>
              <input
                type="text"
                formControlName="endereco"
                placeholder="Endereço"
              />
            </label>

            <!-- Botão para enviar o formulário de adição de contato -->
            <button
              type="submit"
              [disabled]="meuFormulario.invalid"
              id="addSend"
              class="secondary"
            >
              Enviar
            </button>
          </form>
        </div>

        <!-- Lista de contatos -->
        <div id="contactList">
          <ul>
            <!-- Itera sobre os contatos e exibe suas informações -->
            <li *ngFor="let valor of contatoService.getContatos().values()">
              Hash: {{ valor.hash }} | Posição: {{ valor.pos }} | Nome:
              {{ valor.nome }} | Telefone: {{ valor.telefone }} | Endereco:
              {{ valor.endereco }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Serviço para gerenciar contatos
  contatoService: ContatoService;
  // Variável para armazenar o nome do contato a ser buscado
  nomeBusca: string = '';
  // Formulário para adicionar um novo contato
  meuFormulario: FormGroup;
  // Formulário para buscar um contato
  buscarContatoForm: FormGroup;
  // Contato exibido na tela
  detalhesContato: any;
  // Lista de contatos com o mesmo nome
  contactsFound: Contato[] = [];
  // Index da lista de contatos repetidos
  currentContactIndex: number = 0;

  constructor(private fb: FormBuilder) {
    // Inicializa o serviço de contatos
    this.contatoService = new ContatoService();
    // Inicializa o formulário para adicionar um novo contato
    this.meuFormulario = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
    });
    // Inicializa o formulário para buscar um contato
    this.buscarContatoForm = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  // Função para adicionar um novo contato
  addContact() {
    // Cria um novo contato com os dados do formulário
    const novoContato: Contato = new Contato(
      this.meuFormulario.value.nome,
      this.meuFormulario.value.telefone,
      this.meuFormulario.value.endereco,
      this.contatoService
    );

    // Adiciona o novo contato ao serviço de contatos
    this.contatoService.adicionarContato(novoContato);
    // Mostra uma mensagem de sucesso
    alert(`Contato adicionado: ${novoContato.nome}`);

    // Limpa o formulário
    this.meuFormulario.reset();
  }

  ngOnInit(): void {
    return;
  }

  // Função para buscar um contato com base no nome
  buscarContato() {
    const nome = this.buscarContatoForm.value.nome;
    const contatoService = this.contatoService;

    const pos = contatoService.getPos(nome);
    let contatoEncontrado = false;

    // Loop de 5 apenas para verificar se possui contatos a mais com o nome
    for (let i = 0; i < 5; i++) {
      if (contatoService.contatos.has(pos + i)) {
        const contato = contatoService.getContatos(pos + i);
        const contatoNome = contato.nome;

        if (contatoNome == nome) {
          this.detalhesContato = contato;
          this.contatosNext();
          contatoEncontrado = true;
          break;
        }
      }
    }

    if (!contatoEncontrado) {
      alert('Cliente não cadastrado no sistema.');
      this.contactsFound = [];
    }

    this.buscarContatoForm.reset();
  }

  // Função para avançar para o próximo contato encontrado
  proximoContato() {
    if (this.currentContactIndex < this.contactsFound.length - 1) {
      this.currentContactIndex++;
      this.detalhesContato = this.contactsFound[this.currentContactIndex];
    }
  }

  // Função para carregar contatos na lista de repetidos
  contatosNext() {
    this.contactsFound = [];

    let contato = this.detalhesContato;
    let hashq = contato.hash.toString();

    let pos = contato.pos;
    let i = 0;

    while (contato.hash.toString().startsWith(hashq)) {
      this.contactsFound.push(contato);
      i++;
      contato = this.contatoService.contatos.get(pos + i);
    }

    // Se há contatos encontrados, inicialize o detalhesContato com o primeiro contato
    if (this.contactsFound.length > 0) {
      this.detalhesContato = this.contactsFound[0];
      this.currentContactIndex = 0;
    } else {
      this.detalhesContato = null;
    }
  }

  // Função para retroceder para o contato anterior
  contatoAnterior() {
    if (this.currentContactIndex > 0) {
      this.currentContactIndex--;
      this.detalhesContato = this.contactsFound[this.currentContactIndex];
    }
  }

  // Função para mostrar a de busca de contato
  mostrarInput() {
    // Obtém os elementos do DOM
    let inputContainer = document.getElementById('inputContainer');
    let addContato = document.getElementById('addContato');
    let listContainer = document.getElementById('contactList');

    // Altera a exibição dos elementos do DOM
    if (inputContainer) {
      if (inputContainer.style.display !== 'flex') {
        inputContainer.style.display = 'flex';
      } else {
        inputContainer.style.display = 'none';
      }
    }
    if (addContato) {
      if (addContato.style.display !== 'none') {
        addContato.style.display = 'none';
      }
    }
    if (listContainer) {
      if (listContainer.style.display !== 'none') {
        listContainer.style.display = 'none';
      }
    }

    this.detalhesContato = undefined;
  }

  // Função para mostrar o formulário de adição de contato
  adicionarContatoShow() {
    let addContato = document.getElementById('addContato');
    let inputContainer = document.getElementById('inputContainer');
    let listContainer = document.getElementById('contactList');

    if (addContato) {
      if (addContato.style.display !== 'flex') {
        addContato.style.display = 'flex';
      } else {
        addContato.style.display = 'none';
      }
    }
    if (inputContainer) {
      if (inputContainer.style.display !== 'none') {
        inputContainer.style.display = 'none';
      }
    }
    if (listContainer) {
      if (listContainer.style.display !== 'none') {
        listContainer.style.display = 'none';
      }
    }
  }

  // Função para excluir o contato atualmente visualizado
  excluirContato() {
    const contato = this.detalhesContato;
    const contatoPos = contato.pos;

    this.contatoService.contatos.delete(contatoPos);

    this.detalhesContato = undefined;
  }

  // Função para mostrar ou esconder a lista de contatos
  listLoad(): void {
    let listContainer = document.getElementById('contactList');
    let addContato = document.getElementById('addContato');
    let inputContainer = document.getElementById('inputContainer');

    if (listContainer) {
      if (listContainer.style.display !== 'block') {
        listContainer.style.display = 'block';
      } else {
        listContainer.style.display = 'none';
      }
    }
    if (inputContainer) {
      if (inputContainer.style.display !== 'none') {
        inputContainer.style.display = 'none';
      }
    }
    if (addContato) {
      if (addContato.style.display !== 'none') {
        addContato.style.display = 'none';
      }
    }
  }
}
