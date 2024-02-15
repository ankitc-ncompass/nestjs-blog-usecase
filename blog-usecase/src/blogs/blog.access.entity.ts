import { Entity, PrimaryColumn, Column, ManyToOne , OneToOne} from 'typeorm';
import { Topic } from '../topics/topic.entity';
import { Blog } from './blogs.entity';
import { User } from 'src/users/user.entity';


@Entity()
export class BlogAccess {
  @PrimaryColumn()
  id: string;

  @OneToOne(()=> Topic)
  topic_: string;

  @OneToOne(()=> User)
  user_: string;

  @OneToOne(()=> Blog)
  blog_: string;

  
}
