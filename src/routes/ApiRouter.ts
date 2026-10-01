import express, {Router} from "express";
import {CategoryController} from "../controllers/CategoryController";
import {CategoryRepository} from "../repositories/CategoryRepository";
import {CategoryService} from "../services/CategoryService";

export class ApiRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        const repository = new CategoryRepository();
        const service = new CategoryService(repository);
        const controller = new CategoryController(service);

        this.router.post('/category/new', controller.createCategory);
    }

    getRouter(): Router {
        return this.router;
    }

}