import {Router} from "express";
import {HabitController} from "../controllers/HabitController";

export class HabitsRoute {
    private router: Router;

    constructor(private habitController: HabitController) {
        this.router = Router();
        this.configurarRotas();
    }

    configurarRotas() : void {
        this.router.post('/new', this.habitController.createHabit);
        this.router.get('/all', this.habitController.getAll);
        this.router.get('/:id', this.habitController.getById);

    }

    getRouter() : Router {
        return this.router;
    }





}