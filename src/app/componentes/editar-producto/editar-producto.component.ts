import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/Operators';
import { Producto } from 'src/app/modelos/producto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { Categoria } from '../../modelos/categoria';
import { Marca } from '../../modelos/marca';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize, isEmpty } from "rxjs/operators";
import { Subcategoria } from 'src/app/modelos/subcategoria';

@Component({
    selector: 'app-editar-producto',
    templateUrl: './editar-producto.component.html',
    styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
    [x: string]: any;

    public productoDetalle: Observable<Producto>;
    // Variables objetos para "Marca", "Categoria" y Subcategoria
    public marcas: Array<Marca> = [];
    public categorias: Array<Categoria> = [];
    public subcategorias: Array<any> = [];

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

    constructor(private route: ActivatedRoute, private producto: ProductosService, private formBuilder: FormBuilder) {
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
        this.getIdProducto();
        this.mostrarMarcas();
        this.mostrarCategorias();
        this.mostrarSubcategorias();
    }

    public getIdProducto(): void {
        this.productoDetalle = this.route.paramMap.pipe(switchMap((params: ParamMap) =>
            this.producto.getProducto(params.get('id'))
        ))
    }
    // Guardar un nuevo producto
    public actualizarProducto(idProducto: string, urlImagen) {
        console.log(this.subcategoriaObject);
        const nombre = this.formProducto.get("nombre").value;
        const marca = this.formProducto.get("marca").value;
        const categoria = this.formProducto.get("categoria").value;
        const subcategoria = this.formProducto.get("subcategoria").value;
        // this.subcategoriaArray.push(this.formProducto.get("subcategoria").value);
        let precio = parseInt(this.formProducto.get("precio").value);
        let stock = parseInt(this.formProducto.get("stock").value);
        const contenidoNeto = parseFloat(this.formProducto.get("contenidoNeto").value);
        let unidadMedida = this.formProducto.get("unidadMedida").value;
        const descripcion = this.formProducto.get("descripcion").value;

        // Validacion 
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
            this.producto.updateProducto(nuevoProducto, idProducto);
            this.resetProductos();
        } else {
            alert("Faltan campos por llenar, favor llenar todos los campos");
        }
        
    }

     // Mostrar todas las marcas.
     public mostrarMarcas(){
        this.producto.getMarcas().subscribe(data => {
            this.marcas = data;
            console.log(this.marcas); 
        });
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
    public resetProductos() {
        return this.formProducto.reset();
    }

}
