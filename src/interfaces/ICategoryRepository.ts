import {Category} from "../types/Category";

export interface ICategoryRepository {
    createCategory(name: string): Promise<Category>;
    getAll(): Promise<Category[]>
    getById(id: number): Promise<Category | null>
}