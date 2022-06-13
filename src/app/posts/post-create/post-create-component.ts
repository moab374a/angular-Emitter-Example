import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Post} from "../post.module";
import {mimeType} from "./mime-type.validator";


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
  isLoading = false;
  form: FormGroup;

  imagePreview : string

  constructor(private postService: PostService, public route: ActivatedRoute, private router: Router) {}


  getSinglePost(id: string) {
    this.postService.getPost(id).subscribe(response => {
      this.editPost = response
      this.form.setValue({
        'title': this.editPost.title,
        'content': this.editPost.content
      })
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image' : new FormControl(null , {validators: [Validators.required] , asyncValidators : [mimeType]})
    })

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

  onSavePost() {

    if (this.form.invalid) {
      return
    }

    if (this.mode == 'create') {
      this.isLoading = true;
      this.postService.addPost(this.form.value.title, this.form.value.content , this.form.value.image).subscribe((res: void) => {
        console.log(res)
        this.isLoading = false
      })
    } else {
      this.editPost.content = this.form.value.content
      this.editPost.title = this.form.value.title
      this.isLoading = true
      this.postService.updatePost(this.editPost).subscribe(response => {
        console.log(response)
        this.isLoading = false
      })
    }
    this.form.reset();
    this.router.navigate(["/"])
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({image : file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file);
  }



}
