import { Observable, fromEvent } from 'rxjs';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { switchMap, takeUntil, map, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.scss']
})
export class DrawZoneComponent implements AfterViewInit {
  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }
  private captureEvents(canvasEl: HTMLCanvasElement) {
    const source = fromEvent(canvasEl, 'mousedown');
    source.pipe(switchMap((e) => {
      return fromEvent(canvasEl, 'mousemove')
        .pipe(
        takeUntil(fromEvent(canvasEl, 'mouseup')),
        takeUntil(fromEvent(canvasEl, 'mouseleave'))
        , pairwise())
    }))
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);


      });
    ;
  }
  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.cx) { return; }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }

  public getImage(e) {
    e.toElement.href = this.canvas.nativeElement.toDataURL("image/png");
    e.toElement.download = 'singned.png';
  }
}
