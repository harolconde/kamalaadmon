import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from "@angular/fire/storage";
import { Banner } from '../../modelos/banner';
import { ProductosService } from '../../servicios/productos.service';
import { finalize, isEmpty } from "rxjs/operators";
import { from, Observable } from 'rxjs';
import { BannersService } from 'src/app/servicios/banners.service';
import { Marca } from 'src/app/modelos/marca';
import { Categoria } from 'src/app/modelos/categoria';

@Component({
    selector: 'app-banners',
    templateUrl: './banners.component.html',
    styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {

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

    public marcas: Array<Marca> = [];
    public categorias: Array<Categoria> = [];

    // Formulario banners
    public formBanner = new FormGroup({
        marca: new FormControl("", Validators.required),
        categoria: new FormControl("", Validators.required),
        producto: new FormControl("", Validators.required)
    });

    constructor(
        private storage: AngularFireStorage,
        private banner: BannersService,
        private producto: ProductosService
    ) { }

    ngOnInit(): void {
        this.mostrarMarcas();
        this.mostrarCategorias();
    }

    // Traer marcas
    public mostrarMarcas(){
        this.producto.getMarcas().subscribe(data => {
            this.marcas = data;
        })
    }

    // Traer categorias
    public mostrarCategorias(){
        this.producto.getCategorias().subscribe(data => {
            this.categorias = data;
        })
    }

    // Captural imagen de perfil del usuario.
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
        this.filePath = `banners/${this.idImagen}`;
        this.cargaImagen = true;
        console.log(this.filePath);
    }

    public crearBanner(){
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
                            this.guardarBanner(this.urlImage);
                        });
                    })
                )
                .subscribe();
        }).catch(() => {
            console.log('Error al crear el banner, valide que todos los campos e imagen esten llenos');
        });
    }
    
    public guardarBanner(urlImage: Observable<string>){
        const marca = this.formBanner.get("marca").value;
        const categoria = this.formBanner.get("categoria").value;
        let nuevoBanner: Banner = {
            imgBanner: urlImage,
            marca: marca,
            categoria: categoria
        }
        this.banner.postBanner(nuevoBanner);
        setTimeout(() => {
            this.resetBanner();
        }, 300);
    }

    public resetBanner(){
        return this.formBanner.reset();
    }
}
