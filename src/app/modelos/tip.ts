import { Observable } from "rxjs";

export interface Tip {
    id?: string;
    img?: Observable<string>;
    link: string;
    titulo?: string;
    descripcion?: string;
}