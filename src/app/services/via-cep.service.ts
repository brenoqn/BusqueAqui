import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  private baseUrl = 'https://viacep.com.br/ws/';
  constructor(private http: HttpClient) {}

  getCep(cep: string) {
    return this.http.get(`${this.baseUrl}${cep}/json/`);
  }
}
