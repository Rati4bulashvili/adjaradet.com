import { Bet } from "../../sportsbook/bet-details.model";
import { Match } from "./match.model";

export interface FullBet {
    betDetails?: Bet,
    matchDetails?: Match[],
}
