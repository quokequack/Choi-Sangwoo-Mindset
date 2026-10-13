import {db} from "../prisma/db";
import {IHabit} from "../interfaces/IHabit";
import {IHabitRepository} from "../interfaces/IHabitRepository";
import {Habit} from "../types/Habit";

export class HabitRepository implements IHabitRepository {

    async createHabit(data: IHabit): Promise<Habit> {
        return db.orm.public.Habits.create({
            name: data.name,
            category_id: data.category_id,
            color: data.color,
            frequency: data.frequency,
            happens_every: data.happens_every,
            points: data.points,
        });
    }

    async getHabits(): Promise<Habit[]> {
        return db.orm.public.Habits.all();
    }

    async getHabitById(id: number): Promise<Habit | null> {
        return db.orm.public.Habits.where({ id: id }).first();
    }
}