import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  private baseUrl = 'http://localhost:';

  constructor(private http: HttpClient) { }

  uploadFiles(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/topic/upload`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    });
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      headers,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
  
  



