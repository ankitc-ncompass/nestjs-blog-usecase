import { Body, Controller, Post} from "@nestjs/common";
import { CustomResponse } from "src/response";
import { blogService } from "./blog.service";
import { CreateBlogDto } from "./blog.dto";

@Controller('blog')
export class blogController{

       constructor(private readonly blogService: blogService ) {}

       @Post('create-blog')
       async createBlog(@Body() createBlogDto: CreateBlogDto ) {
              const createBlog = await this.blogService.createBlog(createBlogDto);
              return new CustomResponse(200 , "Blog created successfully!" , createBlog);
       }

       @Post('update-blog')
       async updateBLog(@Body() updateBlogDto: CreateBlogDto) {
              const updateBLog = await this.blogService.updateBlog(updateBlogDto);
              return new CustomResponse(200 , "Blog updated successfully!" , updateBLog);
       }
}