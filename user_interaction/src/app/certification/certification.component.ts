import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../service/http.service";
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {
  validateForm: FormGroup;
  notificationContent: string;
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      institution: [null, [Validators.required]],
      idNum: [null, [Validators.required]]
    });
  }

  certificate(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    var body = JSON.stringify({
      "institution": this.validateForm.value.institution,
      "idNum": this.validateForm.value.idNum
    });
    this.httpService.postData('contractAccount/deathCertification', body)
      .subscribe(data => {
          console.log('>>>>>>>>>>>>  received data >>>>>>>>>>>>>>>>>>>');
          console.log(data);
          if (data['code'] == "1") {
            this.notificationContent = 'Death Certification Upload Successfully!';
            this.createBasicNotification();
          }

          else{

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
