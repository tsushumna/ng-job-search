import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../jobs/job.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  
  constructor(private http : HttpClient) { }

  getJobList(){
   return this.http.get<Job[]>('/jobs');
  }

  updateFavorite(i:number,job : Job){
    
    let jobs :Job[] = [];
    if(localStorage.getItem('favorites')) {
      jobs =  JSON.parse(localStorage['favorites']);
    }
    const index = jobs.findIndex(eachJob => eachJob.id === job.id);
    if(index > -1){
      jobs.splice(index,1);
    } else {
      jobs.push(job);
    }
    localStorage.setItem('favorites',JSON.stringify(jobs));
  }

  findJobById(id : number){
    return this.http.get<Job>('/jobs/'+id);
  }
}
