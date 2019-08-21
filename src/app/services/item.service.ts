import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs/Observable";
@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(public afs: AngularFirestore) {}

  getItems() {
    return this.afs.collection("security").valueChanges();
  }
  delete_Student(record_id) {
    return this.afs.doc("security/" + record_id).delete();
  }
  update_Student(recordID, record) {
    this.afs.doc("security/" + recordID).update(record);
  }

  create_NewStudent(record, imei) {
    return this.afs
      .collection("security/")
      .doc(imei)
      .set(record);
  }
}
