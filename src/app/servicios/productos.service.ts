import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';
import { Marca } from '../modelos/marca';
import { Categoria } from '../modelos/categoria';
import { toTypeScript } from '@angular/compiler';
import { Subcategoria } from '../modelos/subcategoria';
import { ContenidoNeto } from '../modelos/contenido-neto';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    private productosCollection: AngularFirestoreCollection<Producto>;
    private productos: Observable<Producto[]>;
    private productosDoc: AngularFirestoreDocument<Producto>;
    private producto: Observable<Producto>;

    private marcasCollection: AngularFirestoreCollection<Marca>;
    private marcas: Observable<Marca[]>;
    private marcasDoc: AngularFirestoreDocument<Marca>;
    private marca: Observable<Marca>;

    private categoriasCollection: AngularFirestoreCollection<Categoria>;
    private categorias: Observable<Categoria[]>;
    private categoriasDoc: AngularFirestoreCollection<Categoria>;
    private categoria: Observable<Categoria>;

    private subcategoriasCollection: AngularFirestoreCollection<Subcategoria>;
    private subcategorias: Observable<Subcategoria[]>;
    private subcategoriasDoc: AngularFirestoreDocument<Subcategoria>;
    private subcategoria: Observable<Subcategoria>;

    private contenidoCollection: AngularFirestoreCollection<ContenidoNeto>;
    private contenidos: Observable<ContenidoNeto[]>;
    private contenidosDoc: AngularFirestoreCollection<ContenidoNeto>;
    private contenido: Observable<ContenidoNeto>;

    constructor(private afs: AngularFirestore) { }

    // Crear un nuevo producto.
    public postProducts(producto: Producto) {
        this.productosCollection = this.afs.collection<Producto>("producto");
        this.productos = this.productosCollection.valueChanges();
        this.productosCollection.add(producto).then(() => {
            console.log("Producto agregado con exito");
        }).catch((error) => {
            console.log("Error al agregar el producto: " + error);
        })
    }

    // Traer todos los productos
    public getProductos(): Observable<Producto[]>{
        this.productosCollection = this.afs.collection<Producto>('producto');
        this.productos = this.productosCollection.valueChanges();
        return this.productos = this.productosCollection.snapshotChanges().pipe(map((changes) => {
            return changes.map((action) => {
                const data = action.payload.doc.data() as Producto;
                data.id = action.payload.doc.id;
                return data;
            })
        }))
    }

    // Eliminar un producto
    public deleteProducto(producto: Producto, idProducto: string){
        this.productosDoc = this.afs.doc<Producto>(`producto/${idProducto}`);
        this.productosDoc.delete().then((response) => {
            console.log("Producto eliminado con exito!!");
        }).catch((error) => {
            console.log("Error al eliminar el producto: " + error);
        })
    }

    // Traer producto unico
    public getProducto(id: string): Observable<Producto>{
        this.productosDoc = this.afs.doc<Producto>(`producto/${id}`);
        return this.producto = this.productosDoc.snapshotChanges().pipe(
            map((action) => {
                if(action.payload.exists === false){
                    return null;
                } else {
                    const data = action.payload.data() as Producto;
                    data.id = action.payload.id;
                    return data;
                }
            })
        )
    }

    public updateProducto(producto: Producto, idProducto: string){
        this.productosDoc = this.afs.doc<Producto>(`producto/${idProducto}`);
        this.productosDoc.update(producto).then((response) => {
            console.log("Producto actulizado con exito: ", response);
        }).catch((error) => {
            console.log("Error al actualizar el producto: ", error);
        });
    }
    // Crear una nueva marca
    public postMarcas(marca: Marca){
        this.marcasCollection = this.afs.collection<Marca>("marca");
        this.marcas = this.marcasCollection.valueChanges();
        this.marcasCollection.add(marca).then(()=> {
            console.log("Producto agregado con exito");
        }).catch((error) => {
            console.log("Error al agregar la marca: " + error);
        })
    }

    // Traer todas las marcas
    public getMarcas(): Observable<Marca[]> {
        this.marcasCollection = this.afs.collection<Marca>("marca");
        this.marcas = this.marcasCollection.valueChanges();
        return this.marcas = this.marcasCollection.snapshotChanges().pipe(
            map((changes) => {
                return changes.map((action)=> {
                    const data = action.payload.doc.data() as Marca;
                    data.id = action.payload.doc.id;
                    return data;
                })
            })
        )
    }

    // Crear una nueva categoria
    public postCategorias(categoria: Categoria){
        this.categoriasCollection = this.afs.collection<Categoria>("categoria");
        this.categorias = this.categoriasCollection.valueChanges();
        this.categoriasCollection.add(categoria).then((response) => {
            console.log("Producto agregado con exito: " + response);
        }).catch((error) => {
            console.log("Error al agregar la categoria: " + error);
        });
    }

    // Traer todas las categorias
    public getCategorias(): Observable<Categoria[]>{
        this.categoriasCollection = this.afs.collection<Categoria>("categoria");
        this.categorias = this.categoriasCollection.valueChanges();
        return this.categorias = this.categoriasCollection.snapshotChanges().pipe(map((changes)=> {
            return changes.map((action) => {
                const data = action.payload.doc.data() as Categoria;
                data.id = action.payload.doc.id;
                return data;
            })
        }))
    }

     // Crear una nueva subcategoria
     public postSubcategorias(subcategoria: Subcategoria){
        this.subcategoriasCollection = this.afs.collection<Subcategoria>("subcategoria");
        this.subcategorias = this.subcategoriasCollection.valueChanges();
        this.subcategoriasCollection.add(subcategoria).then((response) => {
            console.log("Producto agregado con exito: " + response)
        }).catch((error) => {
            console.log()
        })
    }

    // Traer todas las subcategorias
    public getSubcategorias(): Observable<Subcategoria[]>{
        this.subcategoriasCollection = this.afs.collection<Subcategoria>("subcategoria");
        this.subcategorias = this.subcategoriasCollection.valueChanges();
        return this.subcategorias = this.subcategoriasCollection.snapshotChanges().pipe(map( (changes) => {
            return changes.map((action) => {
                const data = action.payload.doc.data() as Subcategoria;
                data.id = action.payload.doc.id;
                return data;
            })
        }))
    }

    public getContenidos(): Observable<ContenidoNeto[]>{
        this.contenidoCollection = this.afs.collection<ContenidoNeto>("contenido");
        this.contenidos = this.contenidoCollection.valueChanges();
        return this.contenidos = this.contenidoCollection.snapshotChanges().pipe(map((changes) => {
            return changes.map((action) => {
                const data = action.payload.doc.data() as ContenidoNeto;
                data.id = action.payload.doc.id;
                return data;
            })
        }))
    }
}
