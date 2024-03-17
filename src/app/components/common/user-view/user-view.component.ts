import { Component, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserserviceService } from '../../../service/userservice.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

 @Input()  user?:User;

 constructor(public userserive:UserserviceService){}
}
