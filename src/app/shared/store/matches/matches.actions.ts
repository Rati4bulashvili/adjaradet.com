import { Action } from "@ngrx/store";
import { Match } from "../../models/match-details.model";
import { Matches } from "../../models/matches.model";

export const GET_MATCHES = '[matches] GET_MATCHES';
export const UPDATE_MATCHES = '[matches] UPDATE_MATCHES';

export class GetMatches implements Action {
  readonly type = GET_MATCHES;
  constructor(){}
}

export class UpdateMatches implements Action {
  readonly type = UPDATE_MATCHES;
  constructor(public payload: Matches){}
}

export type matchesActionTypes = 
  GetMatches | UpdateMatches;


