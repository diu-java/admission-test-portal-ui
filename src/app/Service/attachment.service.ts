import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {FileAttachment} from "../model/file-attachment.model";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private attachmentSource = new BehaviorSubject<FileAttachment | null>(null);
  currentAttachment$ = this.attachmentSource.asObservable();

  updateAttachment(attachment: FileAttachment) {
    this.attachmentSource.next(attachment);
  }


}
