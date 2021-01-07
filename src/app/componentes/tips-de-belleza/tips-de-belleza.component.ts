import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/Operators';
import { Tip } from 'src/app/modelos/tip';
import { TipsService } from 'src/app/servicios/tips.service';

@Component({
    selector: 'app-tips-de-belleza',
    templateUrl: './tips-de-belleza.component.html',
    styleUrls: ['./tips-de-belleza.component.scss']
})
export class TipsDeBellezaComponent implements OnInit {
    @Input() id: string;
    @Input() maxSize: number = 7
    @Output() pageChange: EventEmitter<number>;

    public tips: Array<Tip> = [];
    public titulo: string;
    public p: number = 1;

    // Variables captura y guardado del banner
    public urlImage: Observable<string>;
    public porcentajeCarga: Observable<number>;
    public cargaImagen: boolean;
    public idImagen: any;
    public file: any;
    public filePath: any;

    // Variables mostrar imagen del banner
    imgSrc: any = null;
    fileUpload: File = null;
    mimeType: string = null;

    // Formulario banners
    public formTip = new FormGroup({
        titulo: new FormControl("", Validators.required),
        link: new FormControl("", Validators.required),
        descripcion: new FormControl("", Validators.required)
    });

    constructor(private storage: AngularFireStorage,
        private tip: TipsService) { }

    ngOnInit(): void {
        this.mostrarTips();
    }

    public mostrarTips(){
        this.tip.getTips().subscribe((data) => {
            this.tips = data;
            console.log(this.tips);
        })
    }

    public crearTip(){
        return new Promise<void>((resolve, reject) => {
            if (this.cargaImagen == true) {
                resolve();
            } else {
                reject();
            }
        }).then(() => {
            const ref = this.storage.ref(this.filePath);
            const task = this.storage.upload(this.filePath, this.file);
            // this.uploadPercent = task.percentageChanges();
            task.snapshotChanges()
                .pipe(
                    finalize(() => {
                        ref.getDownloadURL().subscribe((data) => {
                            console.log(data);
                            this.urlImage = data;
                            //this.urlFull();
                            //this.spinner = false; 
                            this.guardarTip(this.urlImage);
                        });
                    })
                )
                .subscribe();
        }).catch(() => {
            console.log('Error al crear el banner, valide que todos los campos e imagen esten llenos');
        });
    }


    // Guardar el tip
    public guardarTip(urlImage){
        const link = this.formTip.get("link").value;
        const titulo = this.formTip.get("titulo").value;
        const descripcion = this.formTip.get("descripcion").value;
        let nuevoTip: Tip = {
            img: urlImage,
            link: link,
            titulo: titulo,
            descripcion: descripcion
        }
        this.tip.postTip(nuevoTip);
        setTimeout(() => {
            this.resetTip();
        }, 300);
    }

    // Eliminar un tip
    public eliminarTip(tip: Tip){
        this.tip.removeTip(tip, tip.id);
    }

    // Captural imagen del tip.
    public selectImg(file: FileList) {

        this.fileUpload = file.item(0);

        // Upload image
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imgSrc = event.target.result;
        };
        reader.readAsDataURL(this.fileUpload);
    }

    // Armar url imagen
    public uploadImg(e: any): void {
        this.idImagen = Math.random().toString(36).substring(2); // Creamos un id unico para el producto
        this.file = e.target.files[0];
        this.filePath = `tips/${this.idImagen}`;
        this.cargaImagen = true;
        console.log(this.filePath);
    }

    // Resetear el formulario del banner
    public resetTip(){
        return this.formTip.reset();
    }

}
