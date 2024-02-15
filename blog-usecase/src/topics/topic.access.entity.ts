import { Entity, PrimaryColumn, Column, ManyToOne , OneToOne} from 'typeorm';
import { Topic } from './topic.entity';
import { Role } from 'src/users/role.entity';
import { User } from 'src/users/user.entity';


@Entity()
export class TopicAccess {
  @PrimaryColumn()
  id: string;

  @OneToOne(()=> Topic)
  topic_: string;

  @OneToOne(()=> User)
  user_: string;

  @OneToOne(()=> Role)
  role_: string;

  
}
