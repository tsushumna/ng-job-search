import { Routes } from '@angular/router';
import { HomePageComponent } from './jobs/home-page/home-page.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';

export const routes: Routes = [
    {
        path : 'jobs',
        component : HomePageComponent
    },
    {
        path : 'favorites',
        component : HomePageComponent
    },
    {
        path : 'favorites/:jobId',
        component : JobDetailComponent
    },
    {
        path : 'jobs/:jobId',
        component : JobDetailComponent
    },
    {
        path : '',
        pathMatch: 'full',
        redirectTo :'jobs'
    }

];
