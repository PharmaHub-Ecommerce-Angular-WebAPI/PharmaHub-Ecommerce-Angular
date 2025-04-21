import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterMarqueeComponent } from '../customer/footer-marquee/footer-marquee.component';
import { MoveAnimateDirective } from '../../Directives/leftorrightfade.directive';
import { ITeamMembers } from '../../Models/iteam-members';

@Component({
  selector: 'app-about-us',
  imports: [
    CommonModule,
    RouterModule,
    FooterMarqueeComponent,
    MoveAnimateDirective,
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
        Image: './AboutUs/1.jpg',
        Position: 'Full Stack Developer',
      },
      {
        Name: 'Eman Elyamani',
        Image: './AboutUs/1.jpg',
        Position: 'Full Stack Developer',
      },
      {
        Name: 'Wesam Ryiad',
        Image: './AboutUs/1.jpg',
        Position: 'Full Stack Developer',
      },
      {
        Name: 'Mohamed Yasser',
        Image: './AboutUs/1.jpg',
        Position: 'Full Stack Developer',
      },
      {
        Name: 'Rawan Qandil',
        Image: './AboutUs/1.jpg',
        Position: 'Full Stack Developer',
      },
    ];
  }
  imgUrl: string = './AboutUs/1.png';
}
