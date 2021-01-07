import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Banner } from '../modelos/banner';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class BannersService {

    private bannersCollection: AngularFirestoreCollection<Banner>;
    private banners: Observable<Banner[]>;
    private bannersDoc: AngularFirestoreDocument<Banner>;
    private banner: Observable<Banner>;

    constructor(private afs: AngularFirestore) { }

    public postBanner(banner: Banner) {
        this.bannersCollection = this.afs.collection<Banner>("banner");
        this.banners = this.bannersCollection.valueChanges();
        this.bannersCollection.add(banner).then((response) => {
            console.log("Banner agregado correctamente: " + response);
        }).catch((error) => {
            console.log("Error al crear el banner: " + error);
        })
    }
}
