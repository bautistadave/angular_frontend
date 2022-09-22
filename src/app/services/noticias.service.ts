import { Noticia } from '@/models/noticia.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = `http://127.0.0.1:8000/api/noticias/`

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(baseUrl);
  } 
  
  save(data: Noticia): Observable<Noticia>{
    return this.http.post<Noticia>(baseUrl, data)
  }

  update(id, data): Observable<Noticia> {
    return this.http.put<Noticia>(`${baseUrl}${id}/`, data )
  }

  delete(id): Observable<Noticia> {
    return this.http.delete<Noticia>(`${baseUrl}${id}/`);
  }  
}
