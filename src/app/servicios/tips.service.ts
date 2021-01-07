import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { Tip } from '../modelos/tip';
import { toTypeScript } from '@angular/compiler';


@Injectable({
    providedIn: 'root'
})
export class TipsService {

    private tipsCollection: AngularFirestoreCollection<Tip>;
    private tips: Observable<Tip[]>;
    private tipsDoc: AngularFirestoreDocument<Tip>;
    private tip: Observable<Tip>;

    constructor(private afs: AngularFirestore) {}

    // Crear tip de belleza
    public postTip(tip: Tip) {
        console.log(tip);
        this.tipsCollection = this.afs.collection<Tip>("tip");
        this.tips = this.tipsCollection.valueChanges();
        this.tipsCollection.add(tip).then((response) => {
            console.log("Tip agregado correctamente: " + response);
        }).catch((error) => {
            console.log("Error al crear el banner: " + error);
        })
    }

    // Eliminar tip de belleza
    public removeTip(tip: Tip, idTip: string){
        this.tipsDoc = this.afs.doc<Tip>(`tip/${idTip}`);
        this.tipsDoc.delete().then((response) => {
            console.log("Se ha eliminado el tip de belleza");
        }).catch((error) => {
            console.log('Error al eliminar el tip: ', error);
        })
    }

    // Mostrar tips de belleza
    public getTips(): Observable<Tip[]> {
        this.tipsCollection = this.afs.collection<Tip>("tip");
        this.tips = this.tipsCollection.valueChanges();
        return this.tips = this.tipsCollection.snapshotChanges().pipe(
            map((changes) => {
                return changes.map((action)=> {
                    const data = action.payload.doc.data() as Tip;
                    data.id = action.payload.doc.id;
                    return data;
                })
            })
        )
    }
}
