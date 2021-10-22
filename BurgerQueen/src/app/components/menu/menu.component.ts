import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  allProducts:any [] = [];
  menu: any[] = [];
  cart: any[] = [];
  cantidad:number;

  constructor(private service: FirestoreService) {
    this.cantidad=1;
  }

  ngOnInit(): void {
    this.getMenu();
  }
  getMenu(){
    this.service.getMenu().subscribe((data) => {
      data.forEach((item) => {
        this.allProducts.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()})
      })
    })
   }
   filteredMenu($event:any){
    this.menu = this.allProducts.filter((item) => item.data.horario == $event.target.value);
   }
   cardClick(data:Object) {
    this.cart.push({data});
    console.log(this.cart)
   }
   aumentarCantidad(){
     this.cantidad++;
     console.log("aumentó");
   }
   disminuirCantidad(data:any){
    this.cantidad--;
    console.log(data);
  }

}
