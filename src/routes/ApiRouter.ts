import express, {Router} from "express";
import {CategoryController} from "../controllers/CategoryController";
import {CategoryRepository} from "../repositories/CategoryRepository";
import {CategoryService} from "../services/CategoryService";
import {CategoriesRoute} from "./CategoriesRoute";
import {HabitRepository} from "../repositories/HabitRepository";
import {HabitService} from "../services/HabitService";
import {HabitController} from "../controllers/HabitController";
import {HabitsRoute} from "./HabitsRoute";

export class ApiRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        const repository = new CategoryRepository();
        const service = new CategoryService(repository);
        const controller = new CategoryController(service);
        const categoriesRoute = new CategoriesRoute(controller);

        const habitRepository = new HabitRepository();
        const habitService = new HabitService(habitRepository);
        const habitController = new HabitController(habitService);
        const habitsRoute = new HabitsRoute(habitController);


        this.router.use('/categories', categoriesRoute.getRouter())
        this.router.use('/habits', habitsRoute.getRouter())


    }

    getRouter(): Router {
        return this.router;
    }

}