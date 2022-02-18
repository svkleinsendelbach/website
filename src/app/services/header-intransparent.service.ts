import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderIntransparentService {
  private _isIntransparent: boolean = false;

  constructor() {}

  public get isIntransparent(): boolean {
    return this._isIntransparent;
  }

  public makeIntransparent() {
    this._isIntransparent = true;
  }

  public makeTransparent() {
    this._isIntransparent = false;
  }
}
