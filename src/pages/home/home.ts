import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos/todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: any;

  constructor(public navCtrl: NavController, public todoService: TodosProvider, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.todoService.getTodos().then(data => {
      this.todos = data;
    });
  }

  createTodo() {
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let title = data.title.trim();

            if (title.length) {
              this.todoService.createTodo({title: title});
            }else {
              this.alert({
                title: 'Error !',
                subTitle: 'Title field must not be empty',
                buttons: ['Ok']
              });
            }
          }
        }
      ]
    });

    prompt.present();
  }

  updateTodo(todo) {
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind ?',
      inputs: [
        {
          name: 'title',
          value: todo.title
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let title = data.title.trim();

            if (title.length) {
              this.todoService.updateTodo({
                _id: todo._id,
                _rev: todo._rev,
                title: title
              });
            }else {
              this.alert({
                title: 'Error !',
                subTitle: 'Title field must not be empty',
                buttons: ['Ok']
              });
            }
          }
        }
      ]
    });

    prompt.present();
  }

  deleteTodo(todo) {
    this.todoService.deleteTodo(todo);
  }

  alert(message: any) {
    var options = {};

    if (typeof message == 'object') {
      options = message;
    }else {
      options = {subTitle: message, buttons: ['Ok']};
    }

    let alert = this.alertCtrl.create(options);

    alert.present();
  }
}