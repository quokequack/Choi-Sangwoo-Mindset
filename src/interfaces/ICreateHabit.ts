import {FrequencyEnum} from "../enum/FrequencyEnum";

export interface ICreateHabit {
    name: string;
    category_id: number;
    color: string | null;
    frequency: FrequencyEnum;
    happens_every: WeekdayEnum;
    points: number;
}