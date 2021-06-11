import { FullBet } from "./full-bet-details.model";

export interface AccountData {
    balance: number;
    placingBet: boolean;
    betsHistory: FullBet[];
}
