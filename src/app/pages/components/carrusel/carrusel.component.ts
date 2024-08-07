import { AfterViewInit, Component} from '@angular/core';
import { AuthService } from 'src/app/components/service/auth.service';
import Swiper from 'swiper';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css'],
})
export class CarruselComponent implements AfterViewInit{

  constructor(private authService: AuthService) {}

  isLoggedIn: boolean = false;

  sliderImages = [
    '/assets/images/image1.jpg',
    '/assets/images/image2.jpg',
    '/assets/images/image3.jpg',
    '/assets/images/image4.jpg',
    '/assets/images/image5.jpg',
    '/assets/images/image6.jpg',
    '/assets/images/image7.jpg',
    '/assets/images/image8.jpg',
  ];

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper', {
      effect: 'slide',  // Puedes cambiar esto a 'fade' si prefieres un efecto de desvanecimiento
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      speed: 800, // Ajusta la velocidad de la transición en milisegundos
      pagination: false,
      autoplay: {
        delay: 3000,  // Ajusta el tiempo entre cambios automáticos
        disableOnInteraction: false
      },
      fadeEffect: {
        crossFade: true // Suaviza el efecto de desvanecimiento
      }
    });
  }
}
