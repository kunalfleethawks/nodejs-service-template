import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('sampleTable')
export class SampleModel {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text')
    name!: string;


}