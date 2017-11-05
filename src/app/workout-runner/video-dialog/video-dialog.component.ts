import {Component, OnInit} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap'
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css']
})
export class VideoDialogComponent implements ModalComponent<VideoDialogContext>, OnInit {
  context: VideoDialogContext;
  videoId: SafeResourceUrl;
  private youtubeUrlPrefix = '//www.youtube.com/embed/';

  constructor(public dialog: DialogRef<VideoDialogContext>, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoId = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrlPrefix + this.dialog.context.videoId);
  }

  ok() {
    this.dialog.close();
  }
}


export class VideoDialogContext extends BSModalContext {
  constructor(public videoId: string) {
    super();
    this.size = "sm";
  }
}



