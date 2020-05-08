import {
  Injectable,
  RendererFactory2,
  Inject,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private theme: string;
  public color = new BehaviorSubject('#69bb7bff');

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  changeTheme(theme) {
    if (this.theme) {
      this.renderer.removeClass(this.document.body, this.theme);
    }
    this.renderer.addClass(this.document.body, theme);
    this.theme = theme;
  }
}
