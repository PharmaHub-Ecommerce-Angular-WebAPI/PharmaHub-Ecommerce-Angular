import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterMarqueeComponent } from '../customer/footer-marquee/footer-marquee.component';
import { MoveAnimateDirective } from '../../Directives/leftorrightfade.directive';
import { ITeamMembers } from '../../Models/iteam-members';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-about-us',
  imports: [
    CommonModule,
    RouterModule,
    FooterMarqueeComponent,
    MoveAnimateDirective,
    MoveUpAnimateDirective,
  ],
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  videoUrl: string = './AboutUs/3.mp4';
  Team: ITeamMembers[];
  constructor() {
    this.Team = [
      {
        Name: 'Khaled Altabey',
        Image: './AboutUs/Khaled.JPG',
        Position: 'Full Stack Developer',
      },
      {
        Name: 'Eman Elyamani',
        Image: './AboutUs/Eman.PNG',
        Position: 'Full Stack Developer',
      },
      {
        Name: 'Wesam Ryiad',
        Image: './AboutUs/Wesam.PNG',
        Position: 'Full Stack Developer',
      },
      {
        Name: 'Mohamed Yasser',
        Image: './AboutUs/Mahdi.jpg',
        Position: 'Full Stack Developer',
      },
      {
        Name: 'Rawan Qandil',
        Image: './AboutUs/Rawan.jpg',
        Position: 'Full Stack Developer',
      },
    ];
  }
  imgUrl: string = './AboutUs/1.png';
}
