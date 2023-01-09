import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BaseCompositeEntity {
    @ApiProperty({ description: 'Created at' })
    @Column({ nullable: false, name: 'created_at' })
    createdAt: Date;

    @ApiProperty({ description: 'Created at' })
    @Column({ nullable: false, name: 'updated_at' })
    updatedAt: Date;

    @ApiProperty({ description: 'Is deleted' })
    @Column({ default: false, name: 'is_deleted' })
    isDeleted: boolean;

    @BeforeInsert()
    beforeInsert() {
        const date = new Date();
        this.createdAt = date;
        this.updatedAt = date;
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
    }
}
