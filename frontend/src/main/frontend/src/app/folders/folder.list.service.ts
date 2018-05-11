import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class FolderListService {

  constructor(private http: HttpClient) {}

  getFoldersList():Observable<any>{
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);

    return this.http
      .get<any>('api/folders/', {headers: headers});
  }

  addFolder(folder : any):Observable<any>{
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);

    return this.http.post('api/folders/add', folder, {headers: headers});
  }

  deleteFolder(folder : any):Observable<any>{
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);

    return this.http.post('api/folders/delete', folder, {headers: headers});
  }
}
