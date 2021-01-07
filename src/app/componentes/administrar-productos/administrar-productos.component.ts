import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../../modelos/producto';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.scss']
})
export class AdministrarProductosComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number = 7
  @Output() pageChange: EventEmitter<number>;
  public p: number = 1;

  public todosLosProductos: Array<Producto> = [];

  constructor(private producto: ProductosService) { }

  ngOnInit(): void {
    this.mostrarProductos();
    this.pageChange = new EventEmitter(true);
  }

  public mostrarProductos() {
    this.producto.getProductos().subscribe(data => {
      this.todosLosProductos = data;
      console.log(this.todosLosProductos);
    })
  }

  // Eliminar productos
  public eliminarProducto(producto: Producto){
    this.producto.deleteProducto(producto, producto.id);
  }

}
