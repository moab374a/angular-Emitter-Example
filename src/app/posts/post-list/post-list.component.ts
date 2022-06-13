import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../post.module";
import {PostService} from "../post.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {


  posts: Post [] = [];

  private postsSub: Subscription;

  isLoading = false;

  constructor(public postService: PostService) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.postsSub = this.postService.getPostUpdateListener().subscribe(res => {
      this.posts = res
      this.isLoading = false
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id).subscribe(res => {
      console.log(res)
    })
  }


}
