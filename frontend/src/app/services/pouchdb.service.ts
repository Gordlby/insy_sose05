import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';
import PouchFind from 'pouchdb-find'
import { Qrcodedata } from '../qrcodedata';

PouchDB.plugin(PouchFind)

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {
  private db: PouchDB.Database;
  private remoteDB: PouchDB.Database;

  constructor() {
    this.db = new PouchDB('lagerdb');
    this.remoteDB = new PouchDB("https://gordladmin:gordlpassword@insysose05db.gordlby.at/products");

    this.db.sync(this.remoteDB, {
      live: true,
      retry: true
    }).on('error', console.error);
  }

  getItem(id: string): Promise<Qrcodedata> {
    return this.db.get<Qrcodedata>(id, {});
  }

  checkIfExists(resdata: Qrcodedata): Promise<string | null> {
    return this.db.find({
      selector: {
        material: resdata.material,
        beschreibung: resdata.beschreibung,
        gewicht: resdata.gewicht
      },
      limit: 1
    }).then(result => {
      if (result.docs.length > 0) {
        return result.docs[0]._id;
      } else {
        return null;
      }
    }).catch(err => {
      console.error("Fehler beim Suchen nach Eintrag: " + err)
      return null;
    });
  }

  addItem(item: Qrcodedata) {
    return this.db.post(item);
  }

  updateItem(id: string, item: Qrcodedata) {
    let data: any = item;
    data._id = id;
    return this.db.put(data)
  }

  addOrUpdateItem(resdata: Qrcodedata): Promise<void | PouchDB.Core.Response> {
    return this.checkIfExists(resdata).then(id => {
      if (id) {
        return this.db.get(id).then((doc: any) => {
          doc.menge += resdata.menge;
          return this.db.put<Qrcodedata>(doc);
        })
      } else {
        return this.db.post<Qrcodedata>(resdata);
      }
    }).catch(err => {
      console.error("Fehler bei func addOrUpdateItem: " + err)
    })
  }
}
