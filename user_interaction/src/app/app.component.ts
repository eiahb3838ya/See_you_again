import { Component } from '@angular/core';
import {ShareService} from "./service/share.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed: boolean;
  idNum: string = null;
  constructor(
    private shareService: ShareService,
    private router: Router) {
    shareService.changeEmitted$.subscribe(
      body => {
        var jsonBody = JSON.parse(body);
        console.log(jsonBody);
        this.idNum = jsonBody['idNum'];
      });
  }
  ngOnInit() {
    this.idNum = null;
    this.isCollapsed = false;
  }
  exit(){
    this.idNum = null;
    this.router.navigate(['/login']);
  }
  home(){
    if(this.idNum == null){
      this.router.navigate(['/home','null']);
    }
    else{
      this.router.navigate(['/home',this.idNum]);
    }
  }
}
