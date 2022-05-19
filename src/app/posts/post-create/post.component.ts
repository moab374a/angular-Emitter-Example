import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from "../post.module";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  enteredTitle =''
  enteredContent = ''

  //create a variable from Event Emitter = باعث الخدث
  @Output()
  postCreated = new EventEmitter<Post>();


  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(form : NgForm) {
    if(form.invalid){
      return
    }
    const post : Post = {title: form.value.title , content : form.value.content}
    this.postCreated.emit(post)

  }
}
