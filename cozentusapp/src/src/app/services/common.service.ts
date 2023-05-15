import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addData(url = '', data = {}) {
   return this.http.post(this.baseUrl + url, data);
  }

  updateData(id: string, url = '', data = {}) {
   return this.http.put(this.baseUrl + `${url}/${id}`, data);
  }

  deleteData(id: string, url = '') {
   return this.http.delete(this.baseUrl + `${url}/${id}`);
  }

  getData(id: string, url = '') {
   return this.http.get(this.baseUrl + `${url}/${id}`);
  }

  getList(url = ''){
    return this.http.get<any>(this.baseUrl + `${url}`);
  }

  getStudentByProgramId(url='',programId:any){
    return this.http.get<any>(this.baseUrl+`${url}/${programId}`);
  }

  getProgramsByBatch(url='',batchId:any): Observable<any> {
    return this.http.get(this.baseUrl+`${url}/${batchId}`);
  }

  getCoursesByProgram(url='',programId:any):Observable<any>{
    return this.http.get(this.baseUrl+`${url}/${programId}`);
  }

  getCourseByCourseId(url='',course_id:any):Observable<any>{
    return this.http.get(this.baseUrl+`${url}/${course_id}`);
  }

  getTopicByCourseId(url='',courseId:any):Observable<any>{
    return this.http.get(this.baseUrl+`${url}/${courseId}`);
  }

  updateTopicPercentage(url='',topicId:any,topicPercentageCompleted:any){
   
    return this.http.post(this.baseUrl+`${url}/${topicId}`,topicPercentageCompleted);
  }
 
}
