import {  Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { JobListComponent } from '../job-list/job-list.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobService } from '../../services/job.service';
import { Job } from '../job.model';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Event, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ 
     MatTabsModule,
              JobListComponent,
              FlexLayoutModule
             ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  currentTabIndex : number = 0;
  constructor(private jobService: JobService,
              private router : Router,
              private route : ActivatedRoute) { }
  ngOnInit(): void {
   
    const currentUrl = this.route.snapshot.url.toString();

    if(currentUrl.includes('jobs')){
        this.currentTabIndex = 0;
    } else {
      this.currentTabIndex = 1;
    }
  }

  onTabChanged(event : MatTabChangeEvent){
    switch(event.index){
      case 0:
        this.router.navigateByUrl('/jobs');
        break;
      case 1:
        this.router.navigateByUrl('/favorites');
        break;
      default:
        this.router.navigateByUrl('/jobs');

    }
  }
}
