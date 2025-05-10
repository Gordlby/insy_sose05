import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library'
import { Qrcodedata } from '../qrcodedata';
import { PouchdbService } from '../services/pouchdb.service';

@Component({
  selector: 'app-scan',
  imports: [ZXingScannerModule],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss'
})
export class ScanComponent {
  activescan: boolean = false;
  BarcodeFormat = BarcodeFormat;
  datavalid: boolean = false;
  qrcodedata: Qrcodedata = {
    material: "",
    beschreibung: "",
    gewicht: undefined,
    menge: undefined,
    lagerort: ""
  };

  constructor(private dbs: PouchdbService) { }

  onScanSuccess(res: string) {
    try {
      const resdata: Qrcodedata = JSON.parse(res);

      if (resdata.material && resdata.beschreibung && resdata.gewicht != undefined && resdata.menge != undefined && resdata.lagerort) {
        this.dbs.addOrUpdateItem(resdata).then((res) => {
          if (res && res.ok) {
            this.dbs.getItem(res.id).then((data) => {
              if (data) {
                this.qrcodedata = data;
              }
            });            
          }
        });
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
    this.datavalid = false;
    this.qrcodedata = {
      material: "",
      beschreibung: "",
      gewicht: undefined,
      menge: undefined,
      lagerort: ""
    };

    this.activescan = true;
  }
}
