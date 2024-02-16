import { Repository } from "typeorm";
import { Topic } from "./topic.entity";
import { InjectRepository } from "@nestjs/typeorm";
//import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { CreateTopicDto } from "./topic.dto";
import { CustomError } from "src/response";
import { TopicAccess } from "./topic.access.entity";
import { TopicAccessDto } from "./topic-access.dto";
import { User } from "src/users/user.entity";
import { Role } from "src/users/role.entity";

@Injectable()
export class TopicService {

    constructor(
        @InjectRepository(Topic) private topicRepository: Repository<Topic>,
        @InjectRepository(TopicAccess) private topicAccessRepository: Repository<TopicAccess>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) { }


    async createTopic(createTopicDto: CreateTopicDto, autenticatedOwner) {
        try {
            if (!autenticatedOwner) {
                throw new CustomError(400, 'Unauthorized user');
            }
            const { id } = createTopicDto
            const topicData = this.topicRepository.create(createTopicDto);

            await this.topicRepository.save(topicData)

            const data = await this.topicRepository.findOne({ where: { id: id } })

            data.user_ = autenticatedOwner

            await this.topicRepository.save(data)

            //login to insert the data automatically into topic access table

            return data

        } catch (error) {
            throw new CustomError(error.statusCode || 500, error.message)
        }

    }



    async topicUserRelation(topicAccessDto: TopicAccessDto) {
        try {
            const topic = await this.topicRepository.findOne({ where: { id: topicAccessDto.topic_ } });
            const user = await this.userRepository.findOne({ where: { id: topicAccessDto.user_ }, relations: ['role'] });
            const role = await this.roleRepository.findOne({ where: { id: topicAccessDto.role_ } });

            //console.log(user);
            console.log(topic);
            //console.log(role);

            if(!user){
                throw new CustomError(403, "user not found")
            }
            const userRoleId=user.role['id'];

            if (!topic || !user || !role || userRoleId !== topicAccessDto.role_ ) {
                throw new CustomError(403, "something went wrong with data ")
            }

            const data = this.topicAccessRepository.create(topicAccessDto);
            await this.topicAccessRepository.save(data)
            return data;
        } catch (error) {
            throw new CustomError(error.statusCode || 500, error.message)
        }
    }
}