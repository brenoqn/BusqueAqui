import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enderecos } from './enderecos';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  private baseUrl = 'https://crud-enderecos.onrender.com';

  constructor(private http: HttpClient) {}

  getEnderecos(): Observable<Enderecos[]> {
    return this.http.get<Enderecos[]>(`${this.baseUrl}/enderecos`);
  }

  postEndereco(endereco: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/enderecos`, endereco);
  }

  apagarEndereco(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/enderecos/${id}`);
  }

  atualizarEndereco(endereco: Enderecos): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/enderecos/${endereco.id}`,
      endereco
    );
  }
}
