import { Body, Controller, Post, Req, UseGuards} from "@nestjs/common";
import { CustomResponse } from "src/response";
import { blogService } from "./blog.service";
import { CreateBlogDto } from "./blog.dto";
import { AuthBlogGuard } from "src/auth/auth-blog.guard";
import { request } from "express";

@Controller('blog')
export class blogController{

       constructor(private readonly blogService: blogService ) {}

       @UseGuards(AuthBlogGuard)
       @Post('create-blog')
       async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() request ) {

              const authenticatedPerson=request['id']
              const createBlog = await this.blogService.createBlog(createBlogDto,authenticatedPerson);
              return new CustomResponse(200 , "Blog created successfully!" , createBlog);
       }

       @UseGuards(AuthBlogGuard)
       @Post('update-blog')
       async updateBLog(@Body() updateBlogDto: CreateBlogDto, @Req() request) {
              const authenticatedPerson=request['id']
              const updateBLog = await this.blogService.updateBlog(updateBlogDto,authenticatedPerson);
              return new CustomResponse(200 , "Blog updated successfully!" , updateBLog);
       }
}