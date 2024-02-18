import { Entity, ManyToOne , OneToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Topic } from '../topics/topic.entity';
import { Blog } from './blogs.entity';
import { User } from 'src/users/user.entity';


@Entity()
export class BlogAccess {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(()=> Topic)
  @JoinColumn({name:"topic_id"})
  topic_: Topic | string;

  @ManyToOne(()=> User)
  @JoinColumn({name:"user_id"})
  user_:User | string;

  @ManyToOne(()=> Blog)
  @JoinColumn({name:"blog_id"})
  blog_:Blog | string;
  
}
