import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class ShareService {
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
}
