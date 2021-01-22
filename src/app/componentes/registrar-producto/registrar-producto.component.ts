import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Producto } from '../../modelos/producto';
import { Categoria } from '../../modelos/categoria';
import { Marca } from '../../modelos/marca';
import { ProductosService } from '../../servicios/productos.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { from, Observable } from 'rxjs';
import { finalize, isEmpty } from "rxjs/operators";
import { Subcategoria } from 'src/app/modelos/subcategoria';

@Component({
    selector: 'app-registrar-producto',
    templateUrl: './registrar-producto.component.html',
    styleUrls: ['./registrar-producto.component.scss']
})
export class RegistrarProductoComponent implements OnInit {

    // Variables capturar y guardar imagen del producto
    public urlImage: Observable<string>;
    public porcentajeCarga: Observable<number>;
    public cargaImagen: boolean;
    public idImagen: any;
    public file: any;
    public filePath: any;
    public subcategoriaObject: Subcategoria;
    public marcaObject: Marca;
    public marcaArray: Array<Marca>;
    public subcategoriaArray: Array<Subcategoria> = [];

    // Variables objetos para "Marca", "Categoria" y Subcategoria
    public marcas: Array<Marca> = [];
    public categorias: Array<Categoria> = [];
    public subcategorias: Array<any> = [];

    // variables mostrar imagen del producto
    imgSrc: any = null;
    fileUpload: File = null;
    mimeType: string = null;

    public formProducto: FormGroup;


    public formCategoria = new FormGroup({
        nombreCategoria: new FormControl("", Validators.required)
    });

    public formSubcategoria = new FormGroup({
        nombreSubcategoria: new FormControl("", Validators.required)
    })

    public formMarca = new FormGroup({
        nombreMarca: new FormControl("", Validators.required)
    });

    constructor(
        private producto: ProductosService,
        private storage: AngularFireStorage,
        private formBuilder: FormBuilder
    ) { 
        this.formProducto = this.formBuilder.group({
            nombre: new FormControl("", Validators.required),
            marca: ["", Validators.required],
            categoria: ["", Validators.required],
            precio: new FormControl("", Validators.required),
            stock: new FormControl("", Validators.required),
            contenidoNeto: new FormControl("", Validators.required),
            unidadMedida: new FormControl("", Validators.required),
            descripcion: new FormControl("", Validators.required),
            subcategoria: ["", Validators.required]
        });
    }

    ngOnInit(): void {
        this.mostrarMarcas();
        this.mostrarCategorias();
        this.mostrarSubcategorias();
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

        // Obtener mime imagen

    }

    // Armar url imagen
    public uploadImg(e: any): void {
        this.idImagen = Math.random().toString(36).substring(2); // Creamos un id unico para el producto
        this.file = e.target.files[0];
        this.filePath = `productos/${this.idImagen}`;
        this.cargaImagen = true;
        console.log(this.filePath);
    }

    // Registrar un nuevo producto
    public crearProducto() {
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
                            this.guardarProducto(this.urlImage);
                        });
                    })
                )
                .subscribe();
        }).catch(() => {
            console.log('Error al crear el producto, valide que todos los campos e imagen esten llenos');
        });

    }

    // Guardar un nuevo producto
    public guardarProducto(urlImagen: Observable<string>){
        const nombre = this.formProducto.get("nombre").value;
        const marca = this.formProducto.get("marca").value;
        const categoria = this.formProducto.get("categoria").value;
        const subcategoria = this.formProducto.get("subcategoria").value;
        // this.subcategoriaArray.push(this.formProducto.get("subcategoria").value);
        const precio = parseInt(this.formProducto.get("precio").value);
        const stock = parseInt(this.formProducto.get("stock").value);
        const contenidoNeto = parseFloat(this.formProducto.get("contenidoNeto").value);
        const unidadMedida = this.formProducto.get("unidadMedida").value;
        const descripcion = this.formProducto.get("descripcion").value;
        if(this.formProducto.valid){
            let nuevoProducto: Producto = {
                imgProducto: urlImagen,
                nombre: nombre,
                marca: marca,
                categoria: categoria,
                subcategoria: subcategoria,
                precio: precio,
                stock: stock,
                contenidoNeto: contenidoNeto,
                unidadMedida: unidadMedida,
                descripcion: descripcion
            }
    
            this.producto.postProducts(nuevoProducto);
            this.resetProductos();
        } else {
            alert("Faltan campos por llenar, favor llenar todos los campos");
        }
        
    }

    // Registrar una nueva marca
    public guardarMarca(){
        const nombre = this.formMarca.get("nombreMarca").value;
        let nuevaMarca: Marca = {
            nombre: nombre
        }

        this.producto.postMarcas(nuevaMarca);
        setTimeout(() => {
            this.resetMarcas();
        }, 300);
    }

    // Mostrar todas las marcas.
    public mostrarMarcas(){
        this.producto.getMarcas().subscribe(data => {
            this.marcas = data;
            console.log(this.marcas); 
        });
    }

    // Registrar una nueva categoria.
    public guardarCategoria(){
        const nombre = this.formCategoria.get("nombreCategoria").value;
        let nuevaCategoria: Categoria = {
            nombre: nombre
        }

        this.producto.postCategorias(nuevaCategoria);
        setTimeout(() => {
            this.resetCategorias();
        }, 300);
    }

    // Registrar una nueva Subcategoria
    public guardarSubcategoria(){
        const nombre = this.formSubcategoria.get("nombreSubcategoria").value;
        let nuevaSubcategoria: Subcategoria = {
            nombre: nombre
        }
        this.producto.postSubcategorias(nuevaSubcategoria);
        setTimeout(() => {
            this.formSubcategoria.reset();
        }, 300);
    }

    // Mostrar todas las categorias
    public mostrarCategorias(){
        this.producto.getCategorias().subscribe(data => {
            this.categorias = data;
        })
    }

    // Mostrar todas las subcategorias
    public mostrarSubcategorias(){
        this.producto.getSubcategorias().subscribe(data => {
            this.subcategorias = data;
            console.log(data);
        })
    }

    // Limpiar campos producto
    public resetProductos(){
        return this.formProducto.reset();
    }

    // Limpiar campos categorias
    public resetCategorias(){
        return this.formCategoria.reset();
    }

    // Limpiar campos marcas
    public resetMarcas(){
        return this.formMarca.reset();
    }

    // Mostrar objeto
    public mostrarObjeto(){
        console.log();
        console.log(this.subcategoriaObject);
    }
}
