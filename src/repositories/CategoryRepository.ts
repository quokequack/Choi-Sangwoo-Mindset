import { db } from '../prisma/db';

export class CategoryRepository {

    public async createCategory(name: string) {
        return db.orm.public.Categories.create({
            name,
        });
    }

    public async getAll() {
        return db.orm.public.Categories.all();
    }
}