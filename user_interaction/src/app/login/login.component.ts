import {Component, OnInit} from '@angular/core';
import {HttpService} from '../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShareService} from "../service/share.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private fb: FormBuilder,
    private shareService: ShareService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      idNum: [null, [Validators.required]],
      psw: [null, [Validators.required]],
      remember: [true]
    });
  }

  login(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    var body = JSON.stringify({
      "idNum": this.validateForm.value.idNum,
      "psw": this.validateForm.value.psw
    });
    this.httpService.postData('userAccount/login', body)
      .subscribe(data => {
          console.log('>>>>>>>>>>>>  received data >>>>>>>>>>>>>>>>>>>');
          console.log(data);
          if (data['code'] == "1") {
            var emitBody = JSON.stringify({
              "idNum": this.validateForm.value.idNum,
            });
            this.shareService.emitChange(emitBody);
            this.router.navigate(['/home',this.validateForm.value.idNum]);
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
}
