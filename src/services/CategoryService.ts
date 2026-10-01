import {CategoryRepository} from "../repositories/CategoryRepository";
import {NullError} from "../error/NullError";

export class CategoryService {
    constructor(private readonly repository: CategoryRepository) {}

    async newCategory(name: string|null) {
        if(name === null){
            throw new NullError(422, "Nome não informado!");
            return undefined;
        }
        return await this.repository.createCategory(name);
    }
}