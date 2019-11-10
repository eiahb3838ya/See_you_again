import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../service/http.service";


export interface Contract {
  contractHash?: string;
  contentHash?: string;
  encroptedContent?: string;
  ownerSig?: string;
  ownerPublicKey?: string;
  idNums?: string[];
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {
  idNum;
  contracts: Contract[];
  constructor(private route:ActivatedRoute, private httpService: HttpService) {}
  ngOnInit() {
    this.idNum=this.route.snapshot.queryParams["idNum"]
    var body = JSON.stringify({
      "idNum": this.idNum
    });
    this.httpService.postData('contractAccount/relativeContracts', body)
      .subscribe(data => {
          console.log('>>>>>>>>>>>>  received data >>>>>>>>>>>>>>>>>>>');
          console.log(data);
          this.contracts = data['contracts'];
          console.log(this.contracts);
          console.log('######################link finish############################');
        },
        error => {
          console.log(error);
        }
      );
  }

}
