import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Credential } from "./Credentials.entity";
import { Appointment } from "./Appointmet.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column({ type: "integer", nullable: false, unique: false })
  nDni: number;

  @OneToOne(() => Credential)
  @JoinColumn()
  credential: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
