import { createAction, props } from "@ngrx/store";
import { AllSportsMatches } from "../../../../shared/models/all-sports-matches.model";

export const GET_MATCHES = '[matches] GET_MATCHES';
export const UPDATE_MATCHES = '[matches] UPDATE_MATCHES';

export const GetMatches = createAction(
  GET_MATCHES
);

export const UpdateMatches = createAction(
  UPDATE_MATCHES,
  props<AllSportsMatches>()
);



