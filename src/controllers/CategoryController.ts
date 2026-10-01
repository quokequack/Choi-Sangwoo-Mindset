import {Request, Response} from 'express';
import {CategoryService} from "../services/CategoryService";
import {NullError} from "../error/NullError";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    createCategory = async (req: Request, res: Response) =>  {
        try{
            const name = req.query.name;
            const category = await this.categoryService.newCategory(name as string);
            return res.status(200).json(category);
        } catch(error){
            return this.errorResponse(res, error);
        }
    }

    private errorResponse = async (res: Response, error: unknown) =>{
        if (error instanceof NullError) {
            return res.status(error.statusCode).json({ erro: error.message});
        }

        return res.status(500).json({ erro: error });
    }
}