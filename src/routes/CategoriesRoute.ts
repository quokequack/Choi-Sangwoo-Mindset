import {CategoryService} from "../services/CategoryService";
import {CategoryController} from "../controllers/CategoryController";
import {Router} from "express";

export class CategoriesRoute {
    private router: Router;
    constructor(private categoryController: CategoryController) {
        this.router = Router();
        this.configurarRotas();
    }

    configurarRotas() : void {
        this.router.post('/new', this.categoryController.createCategory);
        this.router.get('/all', this.categoryController.getAll);
        this.router.get('/:id', this.categoryController.getById);

    }

    getRouter() : Router {
        return this.router;
    }





}