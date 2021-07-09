import * as matchesActions from './matches.actions'
import { AllSportsMatches } from '../../../../shared/models/all-sports-matches.model';
import { Action, createReducer, on } from '@ngrx/store';

const initialState: AllSportsMatches = null;

const MatchesReducer = createReducer(
    initialState,
    on(matchesActions.UpdateMatches, (state, action) => ({ ...state, nbaMatches: action.nbaMatches, ufcMatches: action.ufcMatches, uefaMatches: action.uefaMatches})),
);

export function reducer(state: AllSportsMatches = initialState, action: Action) {
    return MatchesReducer(state, action);
}

