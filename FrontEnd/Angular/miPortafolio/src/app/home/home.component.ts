import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router){
    
  }

  ngOnInit(): void {
      
  }

  irContacto(){
    this.router.navigate(["/contacto"])
  }
  
  irRed(red:string){
    location.href=red;
  }


}
