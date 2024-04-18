import { Component, Input, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../job.model';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule,FlexLayoutModule,RouterModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {

  @Input() isFavouriteTab = false;
  jobs : Job[] = [];
  constructor(private jobService : JobService) {}

  ngOnInit(): void {
    let favourites : Job[] = [];
    if(localStorage.getItem('favourites')) {
      favourites = JSON.parse(localStorage['favourites']);
    }

    if(this.isFavouriteTab){
      this.jobs = favourites;
    } else {
      this.jobService.getJobList().subscribe((data : Job[]) => {
        this.jobs = data;
        favourites.forEach(eachFavourite => {
          const index = this.jobs.findIndex(eachJob => eachJob.id === eachFavourite.id);
          if(index > -1){
            this.jobs[index].favourite = true;
          }
        })
      });
    }
  }

  onClickFavourite(i:number){
    this.jobs[i].favourite = !this.jobs[i].favourite;
    this.jobService.updateFavourite(i,this.jobs[i]);
  }

}
