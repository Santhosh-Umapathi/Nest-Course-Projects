import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

// import { Exclude } from 'class-transformer';
import { ReportEntity } from '../reports/report.entity';

@Entity() // Entity of User Model
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  // @Exclude() // Exclude from response, not good for scalability
  password: string;

  @OneToMany(() => ReportEntity, (report) => report.user, { eager: true })
  reports: ReportEntity[];

  @Column({ default: true })
  admin: boolean;

  //Logging
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id: ' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id: ' + this.id);
  }
}
