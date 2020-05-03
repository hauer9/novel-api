import {
	Table,
	Column,
	Model,
	DefaultScope,
} from 'sequelize-typescript'

/* 
 * Defined base model
*/

@DefaultScope({
	order: [[`createdAt`, `DESC`]],
})
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