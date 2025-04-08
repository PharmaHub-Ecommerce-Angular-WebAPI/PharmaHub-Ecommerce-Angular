import { Component ,AfterViewInit,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
  
    register();
  }
  ngOnInit() {
    console.log("Home component loaded");
  }
  
}
