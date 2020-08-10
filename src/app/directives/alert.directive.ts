import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {

  @Input("error") error: string;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }
  
  divElement: any;
  spanElement: any;
  spanText: any;

  ngOnInit()
  {
    this.divElement = this.renderer2.createElement("div");
    this.renderer2.setAttribute(this.divElement, "role", "alert");
    this.renderer2.setAttribute(this.divElement, "class", "alert alert-danger fade show");

    this.spanElement = this.renderer2.createElement("span");
    this.renderer2.setAttribute(this.spanElement, "class", "message");

    this.spanText = this.renderer2.createText(this.error);
    this.renderer2.setAttribute(this.spanElement, "class", "message");

    this.renderer2.appendChild(this.spanElement, this.spanText);
    this.renderer2.appendChild(this.divElement, this.spanElement);

    this.elementRef.nativeElement.appendChild(this.divElement);

  }

}
