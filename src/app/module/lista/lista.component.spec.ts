import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ListaComponent } from './lista.component';
import { Enderecos } from 'src/app/services/enderecos';
import { EnderecosService } from 'src/app/services/enderecos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;
  let enderecosService: EnderecosService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaComponent],
      imports: [HttpClientTestingModule],
      providers: [EnderecosService],
    }).compileComponents();

    enderecosService = TestBed.inject(EnderecosService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should remove an address', () => {
    const endereco: Enderecos = { id: 1 };
    component.enderecos = [endereco];
    component.apagarEndereco(endereco);
    expect(component.enderecos.length).toBe(0);
  });

  it('should set editing mode for an address', () => {
    const endereco: Enderecos = { id: 1 };
    component.editarEndereco(endereco);
    expect(endereco.editando).toBe(true);
  });

  it('should toggle editing mode for an address', () => {
    const endereco: Enderecos = { id: 1, editando: false };
    component.alternarModoEdicao(0);
    expect(endereco.editando).toBe(true);
    component.alternarModoEdicao(0);
    expect(endereco.editando).toBe(false);
  });

  it('should cancel editing mode for an address', () => {
    const endereco: Enderecos = { id: 1, editando: true };
    component.cancelarEdicao(0);
    expect(endereco.editando).toBe(false);
  });

  it('should save changes for an address', () => {
    const endereco: Enderecos = { id: 1, editando: true };
    component.salvarEdicao(endereco);
    expect(endereco.editando).toBe(false);
  });
});
