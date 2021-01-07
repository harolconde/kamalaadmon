import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RegistrarProductoComponent } from './componentes/registrar-producto/registrar-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { from } from 'rxjs';
import { BannersComponent } from './componentes/banners/banners.component';
import { ProductosService } from './servicios/productos.service';
import { BannersService } from './servicios/banners.service';
import { MenuComponent } from './componentes/menu/menu.component';
import { TipsDeBellezaComponent } from './componentes/tips-de-belleza/tips-de-belleza.component';
import { AdministrarProductosComponent } from './componentes/administrar-productos/administrar-productos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrarProductoComponent,
    BannersComponent,
    MenuComponent,
    TipsDeBellezaComponent,
    AdministrarProductosComponent,
    EditarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    AngularFireAuth,
    ProductosService,
    BannersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
