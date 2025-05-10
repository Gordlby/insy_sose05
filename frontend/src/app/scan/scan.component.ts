import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library'

@Component({
  selector: 'app-scan',
  imports: [ZXingScannerModule],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss'
})
export class ScanComponent {
  BarcodeFormat = BarcodeFormat;
  qrcodedata = {};

  onScanSuccess(res: string) {
    try {
      const resjson = JSON.parse(res);


    } catch (error) {
      console.log("Fehler beim Parsen des QR-Codes: " + error)
    }

  }
}
