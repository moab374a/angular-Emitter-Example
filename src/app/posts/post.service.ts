import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Subject} from "rxjs";
import {Post} from "./post.module";


@Injectable({providedIn: 'root'})
export class PostService {

  backendApi = environment.backendApi

  constructor(private http: HttpClient) {
  }

  getPosts(postPerPage: number, currentPage: number) {

    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;

    return this.http.get<{ message: string; posts: any, moodiPosts: number }>(`${this.backendApi}posts` + queryParams)
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath
              };
            }),
            moodiPosts: postData.moodiPosts
          }
        }))
  }

  addPost(title: string, content: string, image: File) {

    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    console.log(title, content)
    return this.http.post<{ message: string, post: Post }>(`${this.backendApi}posts`, postData)

  }


  deletePost(id: string) {
    return this.http.delete(`${this.backendApi}posts/${id}`)
  }

  getPost(id: string) {
    return this.http.get<Post>(`${this.backendApi}posts/${id}`)
  }

  updatePost(updatedPost: Post) {
    let postData: Post | FormData;

    if (typeof updatedPost.imagePath === 'object') {
      postData = new FormData();
      postData.append("id", updatedPost.id)
      postData.append("title", updatedPost.title)
      postData.append("content", updatedPost.content)
      postData.append("image", updatedPost.imagePath, updatedPost.title)

    } else {
      postData = {
        id: updatedPost.id,
        title: updatedPost.title,
        content: updatedPost.content,
        imagePath: updatedPost.imagePath
      }
    }
    return this.http.put<Post>(`${this.backendApi}posts/${updatedPost.id}`, postData)
  }

}
