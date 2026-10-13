import {CategoryRepository} from "../repositories/CategoryRepository";
import {NullError} from "../error/NullError";
import {ICategoryRepository} from "../interfaces/ICategoryRepository";
import {Category} from "../types/Category";


export class CategoryService {
    constructor(private readonly repository: ICategoryRepository) {}

    async newCategory(name: string|null): Promise<Category> {
        if(name === null){
            throw new NullError(422, "Nome não informado!");
        }
        return await this.repository.createCategory(name);
    }

    async getCategories(): Promise<Category[]>{
        return this.repository.getAll();
    }

    async getById(id:number): Promise<Category | null> {
        return await this.repository.getById(id);
    }
}