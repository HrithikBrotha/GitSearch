
// tslint:disable-next-line:import-blacklist
import { Observable} from 'rxjs/Rx';
import { repos} from '../repos';
import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import {environment} from '../../environments/environment';
import {ProfileRequestService} from '../profile-request.service';
import { user } from '../user';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ GithubService, ProfileRequestService, SweetAlertService]
})
export class DashboardComponent implements OnInit {
  userName = 'peter-wachira';
  repos: repos[];
  users: user[];

  loading = false;
  errorMessage;
  // tslint:disable-next-line:max-line-length
  constructor( private githubService: GithubService, private profileRequest: ProfileRequestService, private alertService: SweetAlertService ) {
  }

    options = {
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  };
public getRepos(event: any) {
  this.loading = true;
  // tslint:disable-next-line:prefer-const
  let promise = new Promise((resolve , reject) => {
   this.githubService.getRepos (this.userName).toPromise().then(response => {
     this.repos = response; this.loading = false; // this will push all data to array [repo]
      resolve();
    },
    error => {
      this.errorMessage = 'An error was encountered';
      this.loading = false;
    }
  );
  });
  return promise;
}
public getUsers(event: any) {
  this.loading = true;
  // tslint:disable-next-line:prefer-const
  let promise = new Promise((resolve , reject) => {
   this.profileRequest.getUsers(this.userName).toPromise().then(response => {
     this.users = response; this.loading = false; // this will push all data to array [repo]
      resolve();
    },
    error => {
      this.errorMessage = 'An error was encountered';
      this.loading = false;
    }
  );
  });
  return promise;
}


  ngOnInit() {
  }

}
