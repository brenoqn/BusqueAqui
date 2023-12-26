import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { ViaCepService } from 'src/app/services/via-cep.service';
import { CadastroComponent } from './cadastro.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let mockViaCepService: jasmine.SpyObj<ViaCepService>;
  let mockEnderecosService: jasmine.SpyObj<EnderecosService>;
  let router: Router;

  beforeEach(async () => {
    mockViaCepService = jasmine.createSpyObj('ViaCepService', ['getCep']);
    mockEnderecosService = jasmine.createSpyObj('EnderecosService', [
      'postEndereco',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, NavbarModule],
      providers: [
        { provide: ViaCepService, useValue: mockViaCepService },
        { provide: EnderecosService, useValue: mockEnderecosService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize enderecoForm with default values', () => {
    const enderecoFormGroup = component.enderecoForm;
    const enderecoFormValues = {
      cep: '',
      numero: '',
      complemento: '',
      categoria: '',
    };
    expect(enderecoFormGroup.value).toEqual(enderecoFormValues);
  });

  it('should call ViaCepService when valid CEP is provided', () => {
    mockViaCepService.getCep.and.returnValue(of({}));
    component.enderecoForm.controls['cep'].setValue('12345678');
    component.buscarEndereco();
    expect(mockViaCepService.getCep).toHaveBeenCalledWith('12345678');
  });

  it('should not call ViaCepService when invalid CEP is provided', () => {
    component.enderecoForm.controls['cep'].setValue('invalido');
    component.buscarEndereco();
    expect(mockViaCepService.getCep).not.toHaveBeenCalled();
  });

  it('should call EnderecosService and navigate when form is valid', fakeAsync(() => {
    mockEnderecosService.postEndereco.and.returnValue(of(null));
    const enderecoFormValues = {
      cep: '12345678',
      numero: '123',
      complemento: 'Apto 101',
      categoria: 'Residencial',
    };
    component.enderecoForm.setValue(enderecoFormValues);
    component.salvarEndereco();
    tick(3000);
    expect(mockEnderecosService.postEndereco).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/lista']);
  }));

  it('should not call EnderecosService or navigate when form is invalid', () => {
    component.enderecoForm.controls['cep'].setValue('');
    component.salvarEndereco();
    expect(mockEnderecosService.postEndereco).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
