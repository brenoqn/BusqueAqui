import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enderecos } from './enderecos';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEnderecos(): Observable<Enderecos[]> {
    return this.http.get<Enderecos[]>(`${this.baseUrl}/enderecos`);
  }

  postEndereco(endereco: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/enderecos`, endereco);
  }
}
