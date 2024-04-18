import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../job.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobDetail } from '../job-detail.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [FlexLayoutModule,CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit{
  jobDetail: JobDetail | undefined;
  constructor(private jobService:JobService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    if(params && params['jobId']){
      this.jobService.findJobById(params['jobId']).subscribe((data:Job) => {
         this.jobDetail = data;
         console.log(this.jobDetail);
      });
    } else {
      this.onBack();
    }
  }
  onBack(){
    this.router.navigateByUrl('/jobs');
  }

}
