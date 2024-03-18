import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'
import { AppService } from './app.service'

@Controller("posts")
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @Get("/get")
  getPosts() {
    return this.appService.getPosts()
  }

  @Get("/get/:id")
  getPost() {
    
  }

  @Post()
  create(@Body() post) {
    return this.appService.createPost(post)
  }

  @Delete("/delete/:id")
  deletePost(@Param("id") id) {
    console.log(id)
    return this.appService.deletePost(id)
  }
}
