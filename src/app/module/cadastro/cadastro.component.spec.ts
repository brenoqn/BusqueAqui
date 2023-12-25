import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CadastroComponent } from './cadastro.component';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { ViaCepService } from 'src/app/services/via-cep.service';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let mockRouter: any;
  let mockViaCepService: any;
  let mockEnderecosService: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockViaCepService = jasmine.createSpyObj('ViaCepService', ['getCep']);
    mockEnderecosService = jasmine.createSpyObj('EnderecosService', [
      'postEndereco',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: ViaCepService, useValue: mockViaCepService },
        { provide: EnderecosService, useValue: mockEnderecosService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize enderecoForm with required controls', () => {
    const enderecoForm = component.enderecoForm;
    expect(enderecoForm.get('cep')).toBeTruthy();
    expect(enderecoForm.get('numero')).toBeTruthy();
    expect(enderecoForm.get('complemento')).toBeTruthy();
    expect(enderecoForm.get('categoria')).toBeTruthy();
  });

  it('should show error message for invalid CEP input', fakeAsync(() => {
    const enderecoForm = component.enderecoForm;
    enderecoForm.get('cep')?.setValue('123');
    expect(enderecoForm.get('cep')?.valid).toBeFalsy();

    fixture.detectChanges();
    tick();

    const errorElement =
      fixture.nativeElement.querySelector('.invalid-feedback');
    expect(errorElement.textContent).toContain('CEP inválido');
  }));

  it('should call ViaCepService getCep() method when buscarEndereco() is called', () => {
    const mockResponse = {};
    mockViaCepService.getCep.and.returnValue(of(mockResponse));

    component.enderecoForm.patchValue({ cep: '12345678' });
    component.buscarEndereco();

    expect(mockViaCepService.getCep).toHaveBeenCalledWith('12345678');
    expect(component.endereco).toEqual(mockResponse);
  });

  it('should handle error when ViaCepService getCep() method fails', fakeAsync(() => {
    mockViaCepService.getCep.and.returnValue(throwError('Error fetching data'));

    component.enderecoForm.patchValue({ cep: '12345678' });
    component.buscarEndereco();

    tick();
    expect(component.endereco).toBeUndefined();
  }));

  it('should call EnderecosService postEndereco() method when salvarEndereco() is called', () => {
    const mockResponse = {};
    mockEnderecosService.postEndereco.and.returnValue(of(mockResponse));

    component.endereco = {};
    component.salvarEndereco();

    expect(mockEnderecosService.postEndereco).toHaveBeenCalledWith(
      component.endereco
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/lista']);
  });

  it('should handle error when EnderecosService postEndereco() method fails', fakeAsync(() => {
    mockEnderecosService.postEndereco.and.returnValue(
      throwError('Error posting data')
    );

    component.endereco = {};
    component.salvarEndereco();

    tick();
  }));
});
