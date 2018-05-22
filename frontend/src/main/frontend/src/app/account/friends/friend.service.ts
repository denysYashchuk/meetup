import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {EmptyObservable} from "rxjs/observable/EmptyObservable";

@Injectable()
export class FriendService {

  constructor(private http: HttpClient) {
  }

  getFriends(login:string): Observable<any> {
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);
    return this.http.get<any>('api/profile/'+login+'/friends', {headers:headers})
      .map(friends => {
        return friends;
      })
  }

  getUsersByUsernamePart(userName: string, type: string = 'unknown'): Observable<any> {
    if (userName.trim().length === 0) {
      return new EmptyObservable();
    }

    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);

    return this.http.get<any>('api/profile/search',{headers:headers, params: {'username' : userName, 'type': type}})
      .map(users => {
        return users;
      })
  }

  getFriendsRequests(): Observable<any> {
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);
    return this.http.get<any>('api/profile/friendsRequests', {headers:headers})
      .map(requests => {
        return requests;
      })
  }

  addFriend(newFriend: String): Observable<any> {
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);
    return this.http.post<any>('api/profile/addFriend', newFriend, {headers:headers}).map(message => {
      return message;
    });
  }

  confirmFriend(confirmedFriend: number): Observable<any> {
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);
    return this.http.post<any>('api/profile/confirmFriend', confirmedFriend, {headers:headers}).map(friend => {
      return friend;
    });
  }

  deleteFriend(id: number): Observable<any> {
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);
    return this.http.post<any>('api/profile/deleteFriend', id, {headers:headers}).map(id => {
      return id;
    });
  }

  getRelation(userId:number): Observable<any>{
    let headers = new HttpHeaders()
      .set("Authorization", `Bearer ${JSON.parse(localStorage.currentUser).token}`);

    return this.http.get('api/profile/userRelations/' + userId, {headers: headers});
  }
}
