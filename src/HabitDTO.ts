import {FrequencyEnum} from "./enum/FrequencyEnum";
import {Request} from "express";
import {ICreateHabit} from "./interfaces/ICreateHabit";
export class HabitDTO {

    constructor(
        private name: string,
        private category_id: number,
        private color: string | null,
        private frequency: FrequencyEnum,
        private happens_every: WeekdayEnum,
        private points: number) {}

    static byRequest(data: Request) {
        return new HabitDTO(
            data.query.name as string,
            data.query.category_id as unknown as number,
            data.query.color as string || null,
            data.query.frequency as FrequencyEnum,
            data.query.happens_every as WeekdayEnum,
            data.query.points as unknown as number
        );
    }

    toHabit() : ICreateHabit {
        return {
            name: this.name,
            category_id: this.category_id,
            color: this.color,
            frequency: this.frequency,
            happens_every: this.happens_every,
            points: this.points,
        }
    }
}