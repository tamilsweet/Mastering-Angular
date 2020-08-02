import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  addMessage(message: string) {
    throw new Error('Method not implemented.' + message);
  }

}
