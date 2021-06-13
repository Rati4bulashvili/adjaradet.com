import { FullBet } from "./full-bet.model";

export interface AccountData {
    balance: number;
    placingBet: boolean;
    betsHistory: FullBet[];
}
