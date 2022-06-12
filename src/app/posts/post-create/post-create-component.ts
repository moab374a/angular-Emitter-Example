import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Post} from "../post.module";
import {response} from "express";

@Component({
  selector: 'app-post',
  templateUrl: './post-create-component.html',
  styleUrls: ['./post-create-component.scss']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = ''
  enteredContent = ''
  private mode = 'create';
  private postId: string;
  public editPost: Post


  constructor(private postService: PostService, public route: ActivatedRoute) {
  }


  getSinglePost(id: string) {
    this.postService.getPost(id).subscribe(response => {
      this.editPost = response
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit'
        this.postId = paramMap.get('postId')
        this.getSinglePost(this.postId)
      } else {
        this.mode = 'create'
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {

    if (form.invalid) {
      return
    }

    if (this.mode == 'create') {
      this.postService.addPost(form.value.title, form.value.content).subscribe((res: void) => {
        console.log(res)
      })
    } else {
      this.editPost.content = form.value.content
      this.editPost.title = form.value.title
      this.postService.updatePost(this.editPost).subscribe(response => {
        console.log(response)
      })
    }
    form.resetForm();
  }

}
