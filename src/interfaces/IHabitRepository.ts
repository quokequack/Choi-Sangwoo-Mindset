import {Habit} from "../types/Habit";
import {IHabit} from "./IHabit";


export interface IHabitRepository {
    getHabits(): Promise<Habit[]>;
    getHabitById(id: number): Promise<Habit|null>
    createHabit(data: IHabit): Promise<Habit>;
}