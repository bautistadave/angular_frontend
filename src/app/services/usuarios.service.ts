import { Usuario } from '@/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = `http://127.0.0.1:8000/api/usuarios/`

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient ) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(baseUrl);
  } 

  save(data: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(baseUrl, data)
  }

  update(id, data): Observable<Usuario> {
    return this.http.put<Usuario>(`${baseUrl}${id}/`, data )
  }

  delete(id): Observable<Usuario> {
    return this.http.delete<Usuario>(`${baseUrl}${id}/`);
  }
}
