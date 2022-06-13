import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../post.module";
import {PostService} from "../post.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {


  posts: Post [] = [];

  private postsSub: Subscription;

  isLoading = false;

  constructor(public postService: PostService , private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.postsSub = this.postService.getPosts().subscribe(res => {
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
      this.ngOnInit()
    })
  }


}
