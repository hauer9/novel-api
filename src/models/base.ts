import {
	Table,
	Column,
	Model,
} from 'sequelize-typescript'

/* 
 * Defined base model
*/


@Table({
	timestamps: true,
	paranoid: true,
	underscored: true,
})
export class BaseModel extends Model<BaseModel> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
	})
	id: number
}