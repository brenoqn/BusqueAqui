/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnderecosService } from './enderecos.service';

describe('Service: Enderecos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnderecosService]
    });
  });

  it('should ...', inject([EnderecosService], (service: EnderecosService) => {
    expect(service).toBeTruthy();
  }));
});
