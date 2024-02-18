import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Topic } from "./topic.entity";
import { CreateTopicDto } from "./topic.dto";
import { request } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { TopicService } from "./topic.service";
import { CustomResponse } from "src/response";
import { TopicAccessDto } from "./topic-access.dto";

@Controller('topic')
export class TopicController{
    constructor(private readonly topicService: TopicService  ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createTopic(@Body() createTopicDto: CreateTopicDto , @Req() request) {
        //console.log(request['id']);
        
    const autenticatedOwner=request['id']

    const response=await this.topicService.createTopic(createTopicDto,autenticatedOwner) 

    return new CustomResponse(200,"Topic created succesfully",response)

}

    @UseGuards(AuthGuard)
    @Post('topic-relations')
    async topicUserRelation(@Body() topicAcessDto:TopicAccessDto, @Req() request){
            const authenticatedOwner=request['id']
            const response= await this.topicService.topicUserRelation(topicAcessDto,authenticatedOwner);
            return new CustomResponse(200,"Data inserted",response)
    }
}