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

	// Create
	static async createItem<T extends BaseModel>(item: T) {
		return await this.create(item)
	}

	// Remove
	static async remove(id: number) {
		return await this.destroy({
			where: { id }
		})
	}

	// Update
	static async updateItem<T extends BaseModel>(id: number, item: T) {
		return await this.update(item, {
			where: { id }
		})
	}

	// Get list
	static async getList({ limit, offset, ...where }: any) {
		return await this.findAndCountAll({
			limit,
			offset,
			where,
		})
	}

	// Get detail
	static async getDetail(where: any) {
		return await this.findOne({
			where,
		})
	}
}