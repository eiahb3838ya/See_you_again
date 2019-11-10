import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Route} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  notificationContent: string;
  validateForm: FormGroup;
  idNum;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  tempStrings: Array<string>=[];
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      comment: [null, [Validators.required]],
      secretKey: [null, [Validators.required]]
    });
    this.addField();
    this.idNum=this.route.snapshot.queryParams["idNum"]
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `relativeIdNum${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
    console.log(this.listOfControl);
    for(let controlObject of this.listOfControl){
      console.log(this.validateForm.value[controlObject['controlInstance']]);
      this.tempStrings.push(this.validateForm.value[controlObject['controlInstance']]);
    }
    console.log(this.tempStrings);

    var body = JSON.stringify({
      "content":this.validateForm.value.comment,
      "private_key":this.validateForm.value.secretKey,
      "idNum":this.idNum,
      "relativeIdNums":this.tempStrings
    });
    this.httpService.postData('contractAccount/updateContract', body)
      .subscribe(data => {
          console.log('>>>>>>>>>>>>  received data >>>>>>>>>>>>>>>>>>>');
          console.log(data);
          if (data['code'] == "1") {
            console.log(data['contractHash']);
            this.notificationContent = 'You have update a testament successfully! The hash value of the contract is ' + data['contractHash'];
            this.createBasicNotification();
          }
          else{
              this.tempStrings = [];
          }
          console.log('######################link finish############################');
        },
        error => {
          console.log(error);
        }
      );
  }
  createBasicNotification(): void {
    this.notification.blank(
      'NOTE',
      this.notificationContent
    );
  }

}
