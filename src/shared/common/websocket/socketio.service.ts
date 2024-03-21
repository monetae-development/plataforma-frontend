import { Injectable } from '@angular/core';
import { io, SocketOptions } from 'socket.io-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socketOptions: SocketOptions = { auth: { token: abp.auth.getToken() } };
  private socket: any;
  private channelNetworkFee = '::TRANSACTION:SENDFEE';
  private channelUpdateStatus = 'TRANSACTION:UPDATE:STATUS';

  constructor() {
    this.socket = io(environment.socketioHost, this.socketOptions);
  }

  getTransactionSendFee(userHash: string): Observable<any> {
    const channel = userHash + this.channelNetworkFee;
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: any) => {
        observer.next(data);
      });
    });
  }

  getTransactionUpdateStatus(): Observable<any> {
    const channel = this.channelUpdateStatus;
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: any) => {
        observer.next(data);
      });
    });
  }
}