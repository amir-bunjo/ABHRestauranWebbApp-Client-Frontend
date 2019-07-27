import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() addClicked = false;
  @Output() cancelClick = new EventEmitter();
  @Output() editClick = new EventEmitter();

  buttonType = 'Add';

  categories;

  category = new Category();
  categoryForEdit;

  constructor(private restaurantService: RestaurantService, private dialog: MatDialog) { }

  ngOnInit() {
    this.categoryForEdit = new Category();
    this.getAllCategories();
  }

  deleteCategoryById(categoryId){
    this.restaurantService.deleteCategoryById(categoryId).subscribe(res=> {
      if(res)
        console.log('succesfully deleted category: '+ categoryId)
    })
  }

  getCategoryById(categoryId){
    this.restaurantService.getCategoryById(categoryId).subscribe(res=> {
      this.buttonType = 'Edit';
      this.categoryForEdit = res;
      this.category.id = this.categoryForEdit.id;
      this.addClicked = true;
      this.editClick.emit();
    })
  }

  getAllCategories() {

    this.restaurantService.getAllCategory().subscribe(res => this.categories = res)
  }

  cancel () {
    this.cancelClick.emit();
    this.addClicked = false;
  }

  setCategoryName(event) {
    console.log(event.target.value)
    this.category = new Category();
    this.category.name = event.target.value;
  }

  saveCategory() {
    console.log(this.category)
   
    this.category.id = this.categoryForEdit.id 
    console.log(this.category.id)
    this.restaurantService.saveCategory(this.category).subscribe(res => {
      this.getAllCategories();
      this.addClicked = false;
      console.log(res)})
  }

  deleteCategory(categoryId) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '150px',
      width: '400px',
      data: { title: 'Are you sure to delete this category' }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res)
        this.restaurantService.deleteCategoryById(categoryId).subscribe(res => {
          console.log(res);
          this.getAllCategories();

        });

    });
  }

}


export class Category {
  id;
  name;
}