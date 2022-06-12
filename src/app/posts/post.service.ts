import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Subject} from "rxjs";
import {Post} from "./post.module";


@Injectable({providedIn: 'root'})
export class PostService {

  backendApi = environment.backendApi

  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<{ message: string; posts: any }>(`${this.backendApi}posts`).pipe(map(postData => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
  }

  addPost(title: string, content: string) {
    console.log(title, content)
    return this.http.post<void>(`${this.backendApi}posts`, {title: title, content: content})
  }

  updatePostUpdate() {
    this.getPosts().subscribe(result => {
      this.postsUpdated = result
      console.log("Updated")
    });

  }

  getPostUpdateListener() {
    return this.getPosts();
  }

  deletePost(id: string) {
    return this.http.delete(`${this.backendApi}posts/${id}`)
  }

  getPost(id: string) {
    return this.http.get<Post>(`${this.backendApi}posts/${id}`)
  }

  updatePost(updatedPost: Post) {
    console.log(updatedPost)
    return this.http.put<Post>(`${this.backendApi}posts/${updatedPost.id}`, updatedPost)
  }

}
