import {Post} from "./post.module";

export class PostService {
  private posts: Post []


  getPosts() {
    // really important
    return [...this.posts];
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content }
    this.posts.push(post)
  }

}
