import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomResponse, CustomError } from '../response';
import { Blog } from './blogs.entity';
//import { JwtService } from '@nestjs/jwt';
import { CreateBlogDto } from './blog.dto';
import { Topic } from 'src/topics/topic.entity';

@Injectable()
export class blogService {

       constructor (
              @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
              @InjectRepository(Topic) private readonly topicRepository: Repository<Topic>,
              //private readonly jwtService: JwtService
       ) {}

       async createBlog(createBLogDto : CreateBlogDto) {
              const { topic_id } = createBLogDto;
              try {
                     const topic = await this.topicRepository.findOne({ where : {id : topic_id}});
                     if (!topic) {
                            throw new CustomError(404 , "Topic not found!");
                     }
                     const createBlog = await this.blogRepository.create(createBLogDto);
                     await this.blogRepository.insert(createBlog);

                     // return new CustomResponse(200 , "Blog created Successfully!" , createBlog);
                     return createBlog;

              } catch (error) {
                     throw new CustomError(error.statusCode || 500, error.message);
              }
       }

       async updateBlog(updateBlog : CreateBlogDto) {
              const {id , title , description, topic_id}  = updateBlog;
              try {
                     const topic = await this.topicRepository.findOne({ where : {id : topic_id}});
                     if (!topic) {
                            throw new CustomError(404 , "Topic not found!");
                     }

                     const blog = this.blogRepository.findOne({ where : {id : id} });
                     if (!blog) {
                            throw new CustomError(404 , "Blog not found!");
                     }

                     const updatedBlog = await this.blogRepository.createQueryBuilder().update(Blog)
                     .set({title : title, description : description})
                     .where("id = :id" , {id : id})
                     .execute();

                     // return new CustomResponse(200, "Blog updated Successfully!", updatedBlog);
                     return updatedBlog;

              } catch (error) {
                     throw new CustomError(error.statusCode || 500, error.message);
              }
       } 
}
