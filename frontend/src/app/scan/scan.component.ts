import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library'
import { Qrcodedata } from '../qrcodedata';

@Component({
  selector: 'app-scan',
  imports: [ZXingScannerModule],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss'
})
export class ScanComponent {
  activescan: boolean =false;
  BarcodeFormat = BarcodeFormat;
  datavalid: boolean = false;
  qrcodedata: Qrcodedata = {
    material: "",
    beschreibung: "",
    gewicht: undefined,
    menge: undefined,
    lagerort: ""
  };

  onScanSuccess(res: string) {
    try {
      const resdata: Qrcodedata = JSON.parse(res);

      if(resdata.material && resdata.beschreibung && resdata.gewicht != undefined && resdata.menge != undefined && resdata.lagerort) {
        this.qrcodedata = resdata;
        window.navigator.vibrate(500);
        this.datavalid = true;
        this.activescan = false;
      } else {
        console.warn("Ungültige Datenstrucktur im QR-Code");
      }

    } catch (error) {
      console.log("Fehler beim Parsen des QR-Codes: " + error)
    }

  }

  activate() {
    this.activescan = true;
  }
}
