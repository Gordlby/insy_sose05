import { Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { QRCodeComponent } from 'angularx-qrcode'
import { Qrcodedata } from '../qrcodedata';

@Component({
  selector: 'app-creator',
  imports: [FormsModule, QRCodeComponent],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss'
})
export class CreatorComponent {
  qrcodedata: Qrcodedata = {
    material: "",
    beschreibung: "",
    gewicht: undefined,
    menge: undefined,
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
