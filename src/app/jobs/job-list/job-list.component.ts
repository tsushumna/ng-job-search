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

  @Input() isFavoriteTab = false;
  jobs : Job[] = [];
  constructor(private jobService : JobService) {}

  ngOnInit(): void {
    let favorites : Job[] = [];
    if(localStorage.getItem('favorites')) {
      favorites = JSON.parse(localStorage['favorites']);
    }

    if(this.isFavoriteTab){
      this.jobs = favorites;
    } else {
      this.jobService.getJobList().subscribe((data : Job[]) => {
        this.jobs = data;
        favorites.forEach(eachFavorite => {
          const index = this.jobs.findIndex(eachJob => eachJob.id === eachFavorite.id);
          if(index > -1){
            this.jobs[index].favorite = true;
          }
        })
      });
    }
  }

  onClickFavorite(i:number){
    this.jobs[i].favorite = !this.jobs[i].favorite;
    this.jobService.updateFavorite(i,this.jobs[i]);
  }

}
