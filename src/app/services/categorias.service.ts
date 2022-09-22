import { Categoria } from '@/models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = `http://127.0.0.1:8000/api/categorias/`

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient ) { }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(baseUrl);
  }
  save(data: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(baseUrl, data)
  }

  update(id, data): Observable<Categoria> {
    return this.http.put<Categoria>(`${baseUrl}${id}/`, data )
  }

  delete(id): Observable<Categoria> {
    return this.http.delete<Categoria>(`${baseUrl}${id}/`);
  }
}
