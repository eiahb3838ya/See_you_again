import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  // serverIP='http://192.168.43.215:8000/';
  serverIP = 'http://192.168.43.78:4200/';

  constructor(private http: HttpClient) {
  }

  postData(url: string, body: any) {
    console.log('===============Link Start=====================');
    console.log('==============Data emitting===================');
    console.log(body ? body : 'No data emitting!');
    console.log('==============================================');
    console.log('=========Data response from server============');
    //下行用于mock data的连接，向服务器连接时注释掉下行即可
    // return this.http.get('assets/mock/'+url+'.json');
    // return this.http.get('assets/mock/'+url.split("/")[0]+'.json');
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':'text/plain'
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    var response = this.http.post(this.serverIP + url, body, httpOptions);
    return response;
  }
}
