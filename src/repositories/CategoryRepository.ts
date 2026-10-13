import { db } from '../prisma/db';
import {ICategoryRepository} from "../interfaces/ICategoryRepository";
import {Category} from "../types/Category";

export class CategoryRepository implements ICategoryRepository {

    async createCategory(name: string) : Promise<Category> {
        return db.orm.public.Categories.create({
            name,
        });
    }

    async getAll() : Promise<Category[]> {
        return db.orm.public.Categories.all();
    }

    async getById(id: number) : Promise<Category | null> {
        return db.orm.public.Categories.where({ id: id}).first();
    }
}