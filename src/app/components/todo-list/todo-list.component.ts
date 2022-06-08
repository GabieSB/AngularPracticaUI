import { Component, OnInit } from '@angular/core';
import {ITodo}  from '../../models/i-todo';
import {TodosService } from 'src/app/common/services.index'
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed','actions'];
  data : ITodo[] = [];
  dataSource  = new MatTableDataSource(this.data);
  newTodo: string = '';
  isEditing: boolean = false;
  todoEditing: ITodo = {
    userId: 0,
    id: 0,
    title: '',
    completed: false
  }

  constructor(
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.GetTodos();
  }

  GetTodos(): void {
    
    this.todosService.GetTodos().subscribe(_data => {
      this.dataSource = new MatTableDataSource(_data);
      this.data = _data;
    }, error => {
      console.log(error);
    })
  }

  SaveChanges(_id?: number): void {
    if(this.isEditing){
      this.UpdateTittle();
    }else
    {
      this.AddItem();
    }
  }
  UpdateItem( _item: ITodo): void {
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i].id === _item.id){
        this.data[i].title = _item.title;
        this.data[i].completed = _item.completed;
        this.dataSource = new MatTableDataSource(this.data);
        this.isEditing = false;
        this.newTodo = '';
        console.log('item was updated')
        break;
      
      }
    }

  }
  UpdateTittle() {

    const item = this.todoEditing;
    if(item){
      item.title = this.newTodo;
      this.UpdateItem(item);
      this.isEditing = false;
    }
  }

  AddItem(): void {
    let lastId = this.data[this.data.length-1].id + 1

    if(this.newTodo){
      let todo = {
        userId: 10,
        id: lastId,
        title: this.newTodo,
        completed: false
      };
     
      this.data.unshift(todo);
      this.dataSource = new MatTableDataSource(this.data);
     
    }else{
      alert('insert todo')
    }
  }

  FindItem(_id: number): ITodo | undefined {

    const todo = this.data.find(item => item.id === _id);

    return todo;
    
  }

  ShowTittle(_id: number):void{
    
    let item = this.FindItem(_id);
    if(item){
      this.isEditing = true;
      this.todoEditing = item;
      this.newTodo = item.title;
    }
  }

  UpdateStatus(_id: number): void {
    let item = this.FindItem(_id);
    if(item){
      item.completed = !item.completed;
      this.UpdateItem(item);
    }
  }

  DeleteItem(_id: number): void {
    let item = this.FindItem(_id);
    if(item){
      let index = this.data.indexOf(item);
      this.data.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.data);
    }
  }
  


}
