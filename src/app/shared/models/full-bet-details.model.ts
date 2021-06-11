import { Bet } from "../../sportsbook/bet-details.model";
import { Match } from "./match-details.model";

export interface FullBet {
    betDetails?: Bet,
    matchDetails?: Match[],
}
