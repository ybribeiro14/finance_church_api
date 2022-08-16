import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('busytimes')
class BusyTimes {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  contract_id: number;

  @Column()
  team_id: number;

  @Column()
  date: Date;

  @Column()
  busy_times: string;

  @Column()
  module: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BusyTimes;
