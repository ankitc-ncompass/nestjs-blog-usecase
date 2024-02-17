import { Entity , OneToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Topic } from './topic.entity';
import { Role } from 'src/users/role.entity';
import { User } from 'src/users/user.entity';


@Entity()
export class TopicAccess {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(()=> Topic)
  @JoinColumn({ name: 'topic_id' })
  topic_: string;

  @OneToOne(()=> User)
  @JoinColumn({ name: 'user_id' })
  user_: string;

  @OneToOne(()=> Role)
  @JoinColumn({ name: 'role_id' })
  role_: string;
}
