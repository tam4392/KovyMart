import { Shipping } from './../../shipping/entities/shipping.entity';
import { Role } from '../../role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  phone: string;

  @Column({ type: 'boolean' })
  gender: boolean;

  @Column()
  birthday: Date;

  @OneToOne(() => Role, (role) => role.staff)
  @JoinColumn()
  role: Role;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Shipping, shipping => shipping.staff)
  shipping: Shipping[];

  @BeforeInsert()
  async checkBeforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
  }
}
