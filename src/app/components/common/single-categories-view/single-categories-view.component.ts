import { Component, Input } from '@angular/core';
import { Category } from '../../../models/Category.model';

@Component({
  selector: 'app-single-categories-view',
  templateUrl: './single-categories-view.component.html',
  styleUrl: './single-categories-view.component.css'
})
export class SingleCategoriesViewComponent {
 @Input() catagory?:Category
}
