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


@Component({
  selector: 'app-dwt',
  templateUrl: './dwt.component.html',
  styleUrls: ['./dwt.component.css']
})
export class DwtComponent implements OnInit, OnDestroy {
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

  constructor() {
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
  save(type:any) {

    this.dwtUtil?.save(type,
      this.saveOptions.fileName,
      this.saveOptions.outPutFormat,
      this.saveOptions.allPages);

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

