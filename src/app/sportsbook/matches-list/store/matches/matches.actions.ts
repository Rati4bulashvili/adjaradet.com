import { Action } from "@ngrx/store";
import { Match } from "../../../../shared/models/match.model";
import { AllSportsMatches } from "../../../../shared/models/all-sports-matches.model";

export const GET_MATCHES = '[matches] GET_MATCHES';
export const UPDATE_MATCHES = '[matches] UPDATE_MATCHES';

export class GetMatches implements Action {
  readonly type = GET_MATCHES;
  constructor(){}
}

export class UpdateMatches implements Action {
  readonly type = UPDATE_MATCHES;
  constructor(public payload: AllSportsMatches){}
}

export type matchesActionTypes = 
  GetMatches | UpdateMatches;


