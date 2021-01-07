import { Observable } from "rxjs";

export interface Banner{
    id?: string;
    imgBanner: Observable<string>;
    marca: string;
    categoria: string;
    producto?: string;
}