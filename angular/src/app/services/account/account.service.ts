import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// import { ACCOUNT } from './mock-account'
import { Account } from '../../data/account/account.model';
import { url } from 'inspector';
import { Configuration } from './config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private config: Configuration) { }

  get(): Observable<Account[]> { 
    return this.http.get<Account[]>(this.config.url);
  }

  post(){
    this.http.post(this.config.url, Account).toPromise().then((res) => {
      // some logic here
    });
  }

  put(){

  }

  delete(){
    
  }
  
  
}