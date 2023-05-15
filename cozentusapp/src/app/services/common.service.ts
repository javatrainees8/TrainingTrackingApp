import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  selectedIdsOfBatch(arg0: string, selectedIds: any[]) {
    throw new Error('Method not implemented.');
  }
  readonly baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addData(url ='', data = {}) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
   return this.http.post(this.baseUrl + url, data,{ headers});
  }

  updateData(id: any, url = '', data = {}) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
   return this.http.put(this.baseUrl + `${url}/${id}`, data,{ headers });
  }

  deleteData(id:any, url = '') { 
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
   return this.http.delete(this.baseUrl + `${url}/${id}`,{ headers });
  }
  getData(id: any, url = '') {
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
    
   return this.http.get(this.baseUrl + `${url}/${id}`,{ headers });
  }
  getDatanew(id: any, url = '') {
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
    
   return this.http.get(this.baseUrl + `${url}/${id}`,{ headers });
  }

  getList(url = ''): Observable<any> {
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
  
    return this.http.get<any>(this.baseUrl + url,{ headers });
  }
  updateProgramIdOfBatch(url = '',data={}) {
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
        'Content-Type': 'application/json'
       }); // <-- add this line to set Content-Type*/
    return this.http.post(this.baseUrl + `${url}`,data,{headers});
  }
  addAssignment(EvaluationName: any, programId: any, program: any, url = '',data={}) {
    const body =EvaluationName;
    let headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json'
     }); // <-- add this line to set Content-Type*/
    return this.http.post(this.baseUrl + `${url}/${programId}`,body,{headers});
  }


  getStudentsByProgramIdAndBatchId(url='',programId: number, batchId: number): Observable<any[]> {
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
    return this.http.get<any>(this.baseUrl+`${url}/${programId}/${batchId}`,{ headers });
  }
  saveAttendance(url='',attendanceData: any[]): Observable<void> {
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
    return this.http.post<void>(this.baseUrl+`${url}`, attendanceData,{ headers });
  }
  getProgramsByBatch(url='',batchId:any):Observable<any>{
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
    return this.http.get(this.baseUrl+`${url}/${batchId}`,{headers});
  }


  getCoursesByProgram(url='',programId:any):Observable<any>{
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
    return this.http.get(this.baseUrl+`${url}/${programId}`,{headers});
  }
  getStudentByProgramIdandBatchId(url='',programId:any,batchId:any):Observable<any>{
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
    return this.http.get(this.baseUrl+`${url}/${programId}/${batchId}`,{headers});
}
getProgramsByBatchId(url='',batchId:any):Observable<any>{
  let headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
    'Content-Type': 'application/json' // <-- add this line to set Content-Type
  });
  return this.http.get(this.baseUrl+`${url}/${batchId}`,{ headers });

}
updatestudentAccordingtoBatchidProgramId(url='',data={}){
  let headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
    'Content-Type': 'application/json' // <-- add this line to set Content-Type
  });
  return this.http.post(this.baseUrl+`${url}`,data,{headers})
}

getCourseByCourseId(url='',course_id:any):Observable<any>{
  let headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
    'Content-Type': 'application/json' // <-- add this line to set Content-Type
  });
  return this.http.get(this.baseUrl+`${url}/${course_id}`,{headers});
}

getTopicByCourseId(url='',courseId:any):Observable<any>{
  let headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
    'Content-Type': 'application/json' // <-- add this line to set Content-Type
  });
  return this.http.get(this.baseUrl+`${url}/${courseId}`,{headers});
}

updateTopicPercentage(url='',topicId:any,topicPercentageCompleted:any){
  let headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
    'Content-Type': 'application/json' // <-- add this line to set Content-Type
  });
  return this.http.post(this.baseUrl+`${url}/${topicId}`,topicPercentageCompleted,{headers});
}

  updateProgramBatchId(url='',batchId:any){
    let headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json' // <-- add this line to set Content-Type
    });
    return this.http.post(this.baseUrl+`${url}/${batchId}`,batchId,{headers});
  }
}
