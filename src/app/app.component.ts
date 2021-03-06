import { Component } from '@angular/core';
import { ToDoService } from './app.service';
import { ToDoItem } from './toDoItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Pearl Hacks To Do List';
  items: ToDoItem [] = [];


  constructor(private appService: ToDoService){
  }

  ngOnInit(){
    this.getAllItems();
  }

  handleComplete = (id) => {
    this.appService.completeItem(id).subscribe(result => {
      this.getAllItems();
      console.log('Item completed successfuly: ' + id);
    }, error => {
      console.log(error);
    });
  }

  handleAdd = (input) => {
    let item = new ToDoItem();
    item.id = 0;
    item.description = input;
    item.completed = false;

    this.appService.add(item).subscribe( result => {
      this.getAllItems();
      console.log('Item created successfuly: ' + item);
      }, error => {
      console.log(error);
      });
    
  }

  handleDelete = (id) => {
    this.appService.delete(id).subscribe(result => {
      this.getAllItems();
      console.log('Item deleted successfully: ' + id);
    }, error => {
      console.log(error);
    });
  }

  getAllItems(){
    this.appService.get().subscribe(items => {
      this.items = items
    }, error => {
      console.log(error)
    });
  }
}
