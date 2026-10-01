import {ICreateHabit} from "../interfaces/ICreateHabit";
import {db} from "../prisma/db";

export class HabitRepository {

    async createHabit(data: ICreateHabit) {
        return db.orm.public.Habits.create({
            name: data.name,
            category_id: data.category_id,
            color: data.color,
            frequency: data.frequency,
            happens_every: data.happens_every,
            points: data.points,
        });
    }

    async getHabits() {
        return db.orm.public.Habits.all();
    }

    async getHabitById(id: number) {
        return db.orm.public.Habits.where({ id: id });
    }
}