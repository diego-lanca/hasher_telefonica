import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { style } from '@angular/animations';
import { Contato, ContatoService, setInTable} from '../home/services/hashTable.service'
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <section>
      <button class="primary" type="button" (click)="mostrarInput()">Buscar Contato</button>
      <div id="inputContainer">
        <form [formGroup]="buscarContatoForm" (ngSubmit)="buscarContato()">
            <label>
              Nome:
              <input type="text" formControlName="nome">
            </label>
            <button type="submit" [disabled]="buscarContatoForm.invalid">Buscar</button>
          </form>
        </div>
        <button class="primary" type="button" id="contato_new" (click)="adicionarContatoShow()">Adicionar Contato</button>
      <div id="addContato">
        <form [formGroup]="meuFormulario" (ngSubmit)="onSubmit()">
        <label>
          Nome:
        <input type="text" formControlName="nome" />
        </label>
        <br>
        <label>
          Telefone:
          <input type="text" formControlName="telefone" />
        </label>
        <br>
        <label>
          Endereço:
          <input type="text" formControlName="endereco" />
        </label>
  
        <!-- <button type="submit" [disabled]="meuFormulario.invalid">Adicionar Contato</button> -->
        <button type="submit" [disabled]="meuFormulario.invalid">Enviar</button>
        </form>
      </div>
      <button class="primary" type="button" id="list_load" (click)="listLoad()">Carregar Lista</button>
      <div id="contactList">
        <ul>
          <li *ngFor="let valor of contatoService.getContatos().values()">
            Hash: {{valor.hash}} | Posição: {{valor.pos}} | Nome: {{valor.nome}} | Telefone: {{valor.telefone}} | Endereco: {{valor.endereco}}
          </li>
        </ul>
      </div>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  contatoService: ContatoService;
  nomeBusca: string = '';
  meuFormulario: FormGroup;
  buscarContatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,) {
    this.contatoService = new ContatoService();
    this.meuFormulario = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required]});
    this.buscarContatoForm = this.fb.group({
      nome: ['', Validators.required]
    })
  }

  onSubmit() {
    const novoContato: Contato = new Contato(
      this.meuFormulario.value.nome,
      this.meuFormulario.value.telefone,
      this.meuFormulario.value.endereco, this.contatoService);

      this.contatoService.adicionarContato(novoContato);
      alert(`Contato adicionado: ${novoContato.nome}`);
  }

  ngOnInit(): void {

    const Diego = new Contato('Diego', '16997772982', 'Rua Francisco C. de Assis 58', this.contatoService)
    this.contatoService.adicionarContato(Diego);
    const DiegoL = new Contato('Diego', '16991231982', 'Rua Francisco C. 58', this.contatoService)
    this.contatoService.adicionarContato(DiegoL);
    const Diego1L = new Contato('Diego', '16992321982', 'Rua Fra1isco C. 58', this.contatoService)
    this.contatoService.adicionarContato(Diego1L);
    // const Arthur = new Contato('Arthur', '16993351778', 'Rua Francisco Valdiusneu de Andrade 18')

    // this.contatoService.adicionarContato(Arthur);
  }

  mostrarInput() {
    let inputContainer = document.getElementById("inputContainer");
  
    if (inputContainer) {
      if (inputContainer.style.display !== "block") {
        inputContainer.style.display = "block";
      } else {
        inputContainer.style.display = "none";
      }
    }
  
  }

  adicionarContatoShow() {
    let inputContainer = document.getElementById("addContato");
  
    if (inputContainer) {
      if (inputContainer.style.display !== "block") {
        inputContainer.style.display = "block";
      } else {
        inputContainer.style.display = "none";
      }
    }
  }

  buscarContato() {
    const nome = this.buscarContatoForm.value.nome;
    const pos = this.contatoService.getPos(nome);
    // alert( this.contatoService.getContatos(pos));
    if(this.contatoService.contatos.has(pos)) {
      const contato = this.contatoService.getContatos(pos);
      alert(`Nome: ${contato.nome}\nTelefone: ${contato.telefone}\nEndereço: ${contato.endereco}`);
      return;
    }
    else {
      alert('Cliente não cadastrado no sistema.')
    }
   
   }
   

  listLoad(): void {
    let listContainer = document.getElementById("contactList");
  
    if (listContainer) {
      if (listContainer.style.display !== "block") {
        listContainer.style.display = "block";
      } else {
        listContainer.style.display = "none";
      }
    }
  }
}