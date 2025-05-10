import { Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { QRCodeComponent } from 'angularx-qrcode'

@Component({
  selector: 'app-creator',
  imports: [FormsModule, QRCodeComponent],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss'
})
export class CreatorComponent {
  qrcodedata = {
    material: "",
    beschreibung: "",
    gewicht: null,
    menge: null,
    lagerort: ""
  }
  JSON: JSON = JSON;

  @ViewChild('qrcodeWrapper', { static: true }) qrWrapper!: ElementRef;
  qrcodewidth = 200

  ngAfterViewInit() {
    this.setQrWidth();

    window.addEventListener('resize', () => {
      this.setQrWidth();
    });
  }

  setQrWidth() {
    const parentWidth = this.qrWrapper.nativeElement.offsetWidth;
    this.qrcodewidth = Math.min(parentWidth, 512);
  }

}
