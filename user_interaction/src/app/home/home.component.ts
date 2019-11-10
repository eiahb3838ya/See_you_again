import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Action} from "rxjs/internal/scheduler/Action";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idNum=null;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.idNum = this.route.snapshot.params["idNum"];
    if(this.idNum=='null'){
      this.idNum=null;
    }

  }
  toClick(){
      this.router.navigate(["login"]);
  }

}
