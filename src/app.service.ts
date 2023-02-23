import { Injectable } from '@nestjs/common';
import { from, throwError } from 'rxjs';
const webpush = require('web-push');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async notifications({ data }) {
    console.log(data);
    const vapidKeys = {
      publicKey: data.publicKey,
      privateKey: data.privateKey,
    };
    webpush.setVapidDetails(
      'mailto:hackdamn025@gmail.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey,
    );
    from(
      webpush.sendNotification(data.sub, JSON.stringify(data.notification)),
    ).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
        throwError(err);
      },
    );
    return { message: 'Notifications sent successfully' };
  }
}
