import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EnderecosService } from './enderecos.service';

describe('EnderecosService', () => {
  let service: EnderecosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnderecosService],
    });

    service = TestBed.inject(EnderecosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get enderecos', () => {
    const mockEnderecos = [
      { id: 1, rua: 'Rua A' },
      { id: 2, rua: 'Rua B' },
    ];

    service.getEnderecos().subscribe((enderecos) => {
      expect(enderecos.length).toBe(2);
      expect(enderecos).toEqual(mockEnderecos);
    });

    const req = httpMock.expectOne('https://crud-enderecos.onrender.com/enderecos');
    expect(req.request.method).toBe('GET');
    req.flush(mockEnderecos);
  });

  it('should post endereco', () => {
    const mockEndereco = { id: 1, rua: 'Rua A' };

    service.postEndereco(mockEndereco).subscribe((res) => {
      expect(res).toEqual(mockEndereco);
    });

    const req = httpMock.expectOne('https://crud-enderecos.onrender.com/enderecos');
    expect(req.request.method).toBe('POST');
    req.flush(mockEndereco);
  });

  it('should delete endereco', () => {
    const id = 1;

    service.apagarEndereco(id).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`https://crud-enderecos.onrender.com/enderecos/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update endereco', () => {
    const mockEndereco = { id: 1, rua: 'Rua Atualizada' };

    service.atualizarEndereco(mockEndereco).subscribe((res) => {
      expect(res).toEqual(mockEndereco);
    });

    const req = httpMock.expectOne(`https://crud-enderecos.onrender.com/enderecos/${mockEndereco.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockEndereco);
  });
});
