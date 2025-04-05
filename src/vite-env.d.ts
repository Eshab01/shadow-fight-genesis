
/// <reference types="vite/client" />

declare namespace createjs {
  export class Stage {
    constructor(canvas: HTMLCanvasElement);
    update(): void;
    addChild(child: DisplayObject): DisplayObject;
    removeAllChildren(): void;
    clear(): void;
  }

  export class Container implements DisplayObject {
    x: number;
    y: number;
    alpha: number;
    rotation: number;
    addChild(...children: DisplayObject[]): DisplayObject;
  }

  export class Shape implements DisplayObject {
    x: number;
    y: number;
    alpha: number;
    rotation: number;
    graphics: Graphics;
  }

  export class Graphics {
    beginFill(color: string): Graphics;
    beginStroke(color: string): Graphics;
    setStrokeStyle(width: number): Graphics;
    drawCircle(x: number, y: number, radius: number): Graphics;
    drawRect(x: number, y: number, width: number, height: number): Graphics;
    moveTo(x: number, y: number): Graphics;
    lineTo(x: number, y: number): Graphics;
    endFill(): Graphics;
    endStroke(): Graphics;
  }

  export class Text implements DisplayObject {
    constructor(text: string, font: string, color: string);
    x: number;
    y: number;
    alpha: number;
    text: string;
    textAlign: string;
  }

  export interface DisplayObject {
    x: number;
    y: number;
    alpha: number;
  }

  export class Ticker {
    static addEventListener(type: string, callback: () => void): void;
    static removeAllEventListeners(type?: string): void;
    static RAF: string;
    static timingMode: string;
  }

  export class Tween {
    static get(target: DisplayObject): Tween;
    to(props: object, duration: number, ease?: any): Tween;
    wait(duration: number): Tween;
  }

  export class Ease {
    static backOut: any;
  }
}
