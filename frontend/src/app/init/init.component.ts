import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-init',
  imports: [NavComponent, RouterOutlet],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent {

}
