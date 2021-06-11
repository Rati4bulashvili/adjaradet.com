import { FullBet } from "./full-bet-details.model";

export interface Account {
    email: string;
    password: string;
    id?: string
    balance: number;
    placingBet: boolean;
    betsHistory: FullBet[];
}
