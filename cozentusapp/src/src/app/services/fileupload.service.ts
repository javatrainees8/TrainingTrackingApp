import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
private basUrl='http://localhost:1235';
  constructor(private http:HttpClient) { }
  uploadFiles(formData:FormData):Observable<any>{
    const url=`${this.basUrl}/topic/upload`;
    const req = new HttpRequest('POST',url,formData,{
      reportProgress:true,
      headers:new HttpHeaders(),
      responseType:'text'
    });
    return this.http.request(req);
  }
}
