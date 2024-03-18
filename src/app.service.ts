import { Injectable } from '@nestjs/common';

interface IPost {
  id: number,
  title: string
}


@Injectable()
export class AppService {

  posts = []

  getPosts() {
    return this.posts
  }

  getPost(id:number) {
    return this.posts[id]
  }

  createPost(post) {
    this.posts.push(post)

    return {...post, id: Date.now()}
  }

  deletePost(id) {
    this.posts = this.posts.filter(post => post.id !== id)
    return this.posts
  }
}
