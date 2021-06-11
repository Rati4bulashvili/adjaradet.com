import { Match } from "./match-details.model";

export interface Matches{
  nbaMatches: Match[],
  ufcMatches: Match[],
  uefaMatches: Match[]
}