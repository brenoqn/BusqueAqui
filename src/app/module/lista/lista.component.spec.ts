import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListaComponent } from './lista.component';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;
  let mockEnderecosService: jasmine.SpyObj<EnderecosService>;

  beforeEach(async () => {
    mockEnderecosService = jasmine.createSpyObj('EnderecosService', [
      'getEnderecos',
      'apagarEndereco',
      'atualizarEndereco',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ListaComponent],
      imports: [NavbarModule],
      providers: [
        { provide: EnderecosService, useValue: mockEnderecosService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockEnderecosService.getEnderecos.and.returnValue(of([]));
    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove endereco on apagarEndereco', () => {
    const initialEnderecos = [
      { id: 1, logradouro: 'Endereco 1' },
      { id: 2, logradouro: 'Endereco 2' },
    ];
    component.enderecos = initialEnderecos;
    mockEnderecosService.apagarEndereco.and.returnValue(of(null));
    component.apagarEndereco({ id: 1, logradouro: 'Endereco 1' });
    expect(component.enderecos.length).toBe(1);
    expect(component.enderecos).toEqual([initialEnderecos[1]]);
  });

  it('should set editando to true on editarEndereco', () => {
    let endereco = { id: 1, logradouro: 'Endereco 1', editando: false };
    component.editarEndereco(endereco);
    expect(endereco.editando).toBeTrue();
  });

  it('should toggle editando on alternarModoEdicao', () => {
    component.enderecos = [
      { id: 1, logradouro: 'Endereco 1', editando: false },
    ];
    component.alternarModoEdicao(0);
    expect(component.enderecos[0].editando).toBeTrue();
  });

  it('should set editando to false on cancelarEdicao', () => {
    component.enderecos = [{ id: 1, logradouro: 'Endereco 1', editando: true }];
    component.cancelarEdicao(0);
    expect(component.enderecos[0].editando).toBeFalse();
  });

  it('should update endereco on salvarEdicao', () => {
    let endereco = { id: 1, logradouro: 'Endereco 1', editando: true };
    mockEnderecosService.atualizarEndereco.and.returnValue(of(null));
    component.salvarEdicao(endereco);
    expect(endereco.editando).toBeFalse();
    expect(mockEnderecosService.atualizarEndereco).toHaveBeenCalledWith(
      endereco
    );
  });
});
