import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import {

  DwtUIOperations,

} from './tools/dwtUIOperations';

import { RemoveCurrentPageDialog } from "./tools/removeCurrentPageDialog";
import { RemoveAllPagesDialog } from "./tools/removeAllPagesDialog";

import {
  getEl, getInputEl
} from './tools/common';
import {ApplicantDocumentService} from "../Service/admission/application/applicantDocument.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FileAttachment} from "../model/file-attachment.model";
import {AttachmentService} from "../Service/attachment.service";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import type = _default.defaults.animations.numbers.type;


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
  @Input() events: Observable<void> | undefined;

  /**
   * A few subscriptions and observables to get information from dwt.service
   */
  protected eventsSubscription: Subscription | undefined;

  protected dwtUtil: DwtUIOperations | undefined;

  protected dlgRemoveCurrent: RemoveCurrentPageDialog | undefined;
  protected dlgRemoveAll: RemoveAllPagesDialog | undefined;

  /**
   * Global variables and status flags.
   */
  public deviceName: string = "Choose...";
  public containerId = "dwtcontrolContainer";

  /**
   * Acquire image options.
   */
  public scanOptions = {
    IfShowUI: false,
    PixelType: "2",// "gray"
    Resolution: 100,
    IfFeederEnabled: true,
    IfDuplexEnabled: false,
    IfAutoDiscardBlankpages: true,
    IfGetImageInfo: false,
    IfGetExtImageInfo: false,
    IfDisableSourceAfterAcquire: true,
    extendedImageInfoQueryLevel: 0
  };

  /**
   * Save image options.
   */
  public saveOptions = {
    outPutFormat: "pdf",
    allPages: "true",
    fileName: "WebTWAINImage",
    upload: true
  };
  id: any;
  refName: any;
  recordName: any;
  recordId: any;
  name: any;
  moduleName: any;
  fileExtension: any;
  constructor(private documentService: ApplicantDocumentService, private toastr: ToastrService, private location: Location,
              private router: Router, private route: ActivatedRoute, private attachmentService: AttachmentService) {
  }

  ngOnInit() {
    // subscribe resize event
    this.eventsSubscription = this.events?.subscribe(
      (args: any) => {
        if (args.type)
          switch (args.type) {
            case "resize":
              this.dwtUtil?.handleResizeEvent();
              break;
            default:
              break;
          }
      }
    );

    this.dwtUtil = new DwtUIOperations(this.containerId);
    this.dlgRemoveCurrent = new RemoveCurrentPageDialog(this.dwtUtil);
    this.dlgRemoveAll = new RemoveAllPagesDialog(this.dwtUtil);

    this.dwtUtil.onPageInit();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.refName = params['refName'];
      this.recordName = params['recordName'];
      this.recordId = params['recordId'];
      this.name = params['name'];
      this.moduleName = params['moduleName'];
      this.fileExtension = params['fileExtension'];
    });
    console.log('DwtUIOperations')
    console.log(DwtUIOperations)


  }

  ngOnDestroy() {
    this.eventsSubscription?.unsubscribe();
    this.dwtUtil?.destroy();
  }

  // acquire image
  acquireImage() {
    this.dwtUtil?.acquireImage(this.deviceName, this.scanOptions);
  }

  // load image
  load() {
    this.dwtUtil?.loadImage();
  }

  onclickSaveDocuments() {
    this.dwtUtil?.onclickSaveDocuments();
  }

  onclickShowUploadedFiles() {
    this.dwtUtil?.onclickShowUploadedFiles();
  }

  handleDeviceChange() {
    if (this.deviceName === "" || this.deviceName === "Choose...")
      return;
    this.dwtUtil?.handleDeviceChanged(this.deviceName);
  }

  handleOutPutFormatChange(extension: string) {

    if (extension !== "pdf" && extension !== "tif") {
      this.saveOptions.allPages = "false";
    }

    this._onchangeImageExtension(extension);
  }

  // upload to server OR save to local
  // save(type:any) {
  //
  //   this.dwtUtil?.save(type,
  //     this.saveOptions.fileName,
  //     this.saveOptions.outPutFormat,
  //     this.saveOptions.allPages);
  //
  // }
  save(type:any) {
    this.dwtUtil?.save(type,
      this.saveOptions.fileName,
      this.saveOptions.outPutFormat,
      this.saveOptions.allPages);
  }
  dataURItoBlob(dataURI:any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }
  base64ToFile(base64String: string, fileName: string, mimeType: string): File {
    // Remove the prefix if it exists (e.g., "data:application/pdf;base64,")
    const base64WithoutPrefix = base64String.split(',')[1];
    // Decode the Base64 string
    const byteCharacters = atob(base64WithoutPrefix);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    // Create a Blob from the binary data with application/pdf MIME type
    const blob = new Blob([byteArray], { type: mimeType });
    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: mimeType });
    return file;
  }

  postDoc(){
    this.dwtUtil?.getData(this.saveOptions.outPutFormat,this.saveOptions.allPages).then((data:any)=>{
      const file = this.base64ToFile(data, this.saveOptions.fileName + '.' + this.saveOptions.outPutFormat, this.fileExtension);
      const maxSizeInBytes = 2048 * 1024;
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
      if (file.size > maxSizeInBytes) {
        this.toastr.error('File size exceeds the maximum limit of 2 MB')
      }else if (!allowedTypes.includes(file.type)){
        this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
      }else {
        this.documentService.postDocument(file, this.recordId, this.name, this.moduleName).subscribe((response: any) => {
          if (response.status) {
            this.toastr.success(response.message)
            const attachment: FileAttachment = {
              id: response.data.id,
              code: response.data.code,
              name: response.data.name,
              fileExtension: response.data.fileExtension
            };
            let existingAttachments: any[] = JSON.parse(sessionStorage.getItem('attachmentData') || '[]');
            if (!Array.isArray(existingAttachments)) {
              existingAttachments = [];
            }
            existingAttachments.push(attachment);
            sessionStorage.setItem('attachmentData', JSON.stringify(existingAttachments));
            sessionStorage.getItem('modelData');
            this.documentService.setOpenFormView(true);
            this.router.navigate(['/admission-application-form', this.id]);
          }
        })
      }
    });
  }
  backToApplication(){
    sessionStorage.getItem('modelData');
    this.documentService.setOpenFormView(true);
    this.router.navigate(['/admission-application-form', this.id]);
  }

  postDocDemo(){
    this.dwtUtil?.getData(this.saveOptions.outPutFormat,this.saveOptions.allPages).then((data:any)=>{
      const file = this.base64ToFile(data, this.saveOptions.fileName + '.' + this.saveOptions.outPutFormat, this.fileExtension);
      const maxSizeInBytes = 500 * 1024;
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
      console.log(maxSizeInBytes)
      console.log(file.size)
      if (file.size > maxSizeInBytes) {
        this.toastr.error('File size exceeds the maximum limit of 500 KB')

      }else if (!allowedTypes.includes(file.type)){
        this.toastr.error('File type not supported. Only PDF, PNG, JPEG, JPG files are allowed.');
      }else {
        this.documentService.postDocumentUpload(file, this.recordId, this.refName, this.recordName, this.recordId, this.name, this.moduleName).subscribe((response: any) => {
          if (response.status) {
            this.toastr.success(response.message)
            this.documentService.setOpenFormView(true);
            this.router.navigate(['/admission-application-form', this.id]);
          }
        })
      }
    });
  }



  // UI mouse click event
  clickbtnZoomOut() {
    this.dwtUtil?.onclickZoomOut();
  }
  clickbtnZoomIn() {
    this.dwtUtil?.onclickZoomIn();
  }
  clickbtnOrigSize() {
    this.dwtUtil?.onclickOrigSize();
  }
  clickbtnFitWindow() {
    this.dwtUtil?.onclickFitWindow();
  }
  clickbtnRotateLeft() {
    this.dwtUtil?.onclickRotateLeft();
  }
  clickbtnCrop() {
    this.dwtUtil?.onclickCrop();
  }
  clickbtnShowImageEditor() {
    this.dwtUtil?.onclickShowImageEditor();
  }
  clickbtnSelect() {
    this.dwtUtil?.onclickSelect();
  }
  clickbtnHand() {
    this.dwtUtil?.onclickHandButton();
  }

  clickbtnRemoveCurrentImage() {
    this.dlgRemoveCurrent?.remove();
  }
  clickbtnRemoveAllImages() {
    this.dlgRemoveAll?.removeAll();
  }

  showCustomInfo() {
    let customDetail = getEl("customDetail");
    if (customDetail)
      customDetail.style.display = "";
  }

  hideCustomInfo() {
    let customDetail = getEl("customDetail");
    if (customDetail)
      customDetail.style.display = "none";
  }

  showUploadedFilesDetail() {
    let customDetail = getEl("uploadedFilesDetail");
    if (customDetail)
      customDetail.style.display = "";
  }

  hideUploadedFilesDetail() {
    let customDetail = getEl("uploadedFilesDetail");
    if (customDetail)
      customDetail.style.display = "none";
  }


  private _onchangeImageExtension(strExtension: string) {

    let currentPage = getInputEl("CurrentPage");
    let allPages = getInputEl("AllPages");

    // set AllPages OR CurrentPage
    switch (strExtension) {
      case "pdf":
        this.saveOptions.allPages = "true";
        break;
      case "tif":
      case "bmp":
      case "jpg":
      case "png":
        this.saveOptions.allPages = "false";
        break;
      default:
        break;
    }

    // set Enabled
    if (strExtension == "pdf" || strExtension == "tif") {
      if (currentPage) {
        currentPage.disabled = false;
      }

      if (allPages) {
        allPages.disabled = false;
      }
    } else {
      if (currentPage) {
        currentPage.disabled = true;
      }

      if (allPages) {
        allPages.disabled = true;
      }
    }
  }
}

