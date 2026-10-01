import {HabitRepository} from "../repositories/HabitRepository";
import {NullError} from "../error/NullError";
import {HabitDTO} from "../HabitDTO";
import {Request} from "express";

export class HabitService {

    constructor(private readonly habitRepository: HabitRepository) {}

    async getHabits(){
        return this.habitRepository.getHabits();
    }

    async createHabit(data: Request) {
        if(!data.query.name === null
            || data.query.category_id === null
            || data.query.frequency === null
            || data.query.happens_every === null
            || data.query.points ===  null){
            throw new NullError(422, "Preencha todos os campos obrigatórios!");
        }
        const dto  = HabitDTO.byRequest(data);
        return this.habitRepository.createHabit(dto.toHabit());
    }
}