import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarProductosComponent } from './componentes/administrar-productos/administrar-productos.component';
import { BannersComponent } from './componentes/banners/banners.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { RegistrarProductoComponent } from './componentes/registrar-producto/registrar-producto.component';
import { TipsDeBellezaComponent } from './componentes/tips-de-belleza/tips-de-belleza.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'productos'
    },
    {
        path: 'productos',
        component: RegistrarProductoComponent
    },
    {
        path: 'banners',
        component: BannersComponent
    },
    {
        path: 'tips-de-belleza',
        component: TipsDeBellezaComponent
    },
    {
        path: 'administrar-productos',
        component: AdministrarProductosComponent
    },
    {
        path: 'producto/:id',
        component: EditarProductoComponent
    },
    {
        path: 'modulos/login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
