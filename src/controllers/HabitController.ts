import {HabitService} from "../services/HabitService";
import {Request, Response} from "express";
import {NullError} from "../error/NullError";

export class HabitController {
    constructor(private readonly habitService: HabitService) {}

    createHabit = async (req: Request, res: Response)=> {
        try{
            const habit = await this.habitService.createHabit(req);
            return res.status(200).json(habit);
        } catch (error) {
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