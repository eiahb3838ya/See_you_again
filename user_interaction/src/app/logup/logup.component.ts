import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpService} from "../service/http.service";
import {NzNotificationService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {ShareService} from "../service/share.service";

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {
  validateForm: FormGroup;
  notificationContent: string;

  constructor(private fb: FormBuilder,
              private httpService: HttpService,
              private notification: NzNotificationService,
              private router: Router,
              private shareService:ShareService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      publicKey: [null, [Validators.required]],
      address: [null, [Validators.required]],
      idNum: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      email: [null, [Validators.email, Validators.required]],
      captcha: [null, []],
      agree: [false]
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    var body = JSON.stringify({
      "idNum": this.validateForm.value.idNum,
      "psw": this.validateForm.value.password,
      "publicKey": this.validateForm.value.publicKey,
      "publicAddress": this.validateForm.value.address,
      "email": this.validateForm.value.email
    });
    this.httpService.postData('userAccount/logup', body)
      .subscribe(data => {
          console.log('>>>>>>>>>>>>  received data >>>>>>>>>>>>>>>>>>>');
          console.log(data);
          if (data['code'] == "1") {
            this.notificationContent = "Log Up Successfully";
            this.createBasicNotification();
            // this.router.navigate(['/home']);
            // this.router.navigate(['/list']);
            var emitBody = JSON.stringify({
              "idNum": this.validateForm.value.idNum,
            });
            this.shareService.emitChange(emitBody);
            this.router.navigate(['/home',this.validateForm.value.idNum]);

          }
          else{
            this.notificationContent = 'Log up not successfully, please try again.';
            this.createBasicNotification();
            this.router.navigate(['/home',null]);
          }
          console.log('######################link finish############################');
        },
        error => {
          console.log(error);
          this.notificationContent = 'Log up not successfully, please try again.';
          this.createBasicNotification();
          this.router.navigate(['/home',null]);
        }
      );
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  createBasicNotification(): void {
    this.notification.blank(
      'NOTE',
      this.notificationContent
    );
  }
}
