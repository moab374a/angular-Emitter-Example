import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../post.module";
import {PostService} from "../post.service";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit , OnDestroy {


  posts : Post [] = [];

  private postsSub: Subscription;

  constructor(public postService : PostService) { }

  ngOnInit(): void {

    this.postsSub = this.postService.getPostUpdateListener().subscribe(res => {
      console.log("After Update")
      console.log(res)
      this.posts = res
    })
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
