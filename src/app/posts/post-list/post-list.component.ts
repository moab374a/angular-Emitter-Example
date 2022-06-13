import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../post.module";
import {PostService} from "../post.service";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {


  posts: Post [] = [];

  private postsSub: Subscription;

  isLoading = false;


  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10]
  currentPage = 1

  constructor(public postService: PostService) {
  }

  getPosts(postPerPage: number, currentPage: number) {
    this.postsSub = this.postService.getPosts(postPerPage, currentPage).subscribe(transformedPostData => {
      this.posts = transformedPostData.posts

      this.totalPosts = transformedPostData.moodiPosts

      this.isLoading = false
    })
  }

  ngOnInit(): void {
    this.isLoading = true
    this.getPosts(this.postsPerPage, this.currentPage)
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true
    this.postService.deletePost(id).subscribe(res => {
      this.getPosts(this.postsPerPage , this.currentPage)
      //this.ngOnInit()
    })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex = +1
    this.postsPerPage = pageData.pageSize
    this.getPosts(this.postsPerPage, this.currentPage)
  }


}
