import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from "../post.module";
import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  enteredTitle = ''
  enteredContent = ''


  constructor(private postService: PostService) {
  }


  ngOnInit(): void {
  }

  onAddPost(form: NgForm) {

    if (form.invalid) {
      return
    }

    this.postService.addPost(form.value.title, form.value.content).subscribe((res: void) => {
      console.log(res)
      form.resetForm();
      this.postService.updatePostUpdate()
    })

  }
}
