import { Observable } from "rxjs";
import { Subcategoria } from "./subcategoria";
import { Marca } from "./marca";
import { Categoria } from "./categoria";

export interface Producto {
    id?: string;
    imgProducto?: Observable<string>;
    nombre: string;
    marca: Array<Marca>;
    //idMarca?: string;
    precio: number;
    contenidoNeto: number;
    unidadMedida: string;
    descripcion: string;
    calificacion?: number;
    stock: number;
    categoria?: Array<Categoria>;
    subcategoria?: Array<Subcategoria>;
    estado?: boolean
    //idCategoria?: string;  
}