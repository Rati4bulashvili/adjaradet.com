import * as matchesActions from './matches.actions'
import { AllSportsMatches } from '../../../../shared/models/all-sports-matches.model';

const currentState: AllSportsMatches = null;

export function MatchesReducer(state: AllSportsMatches = currentState, action: matchesActions.matchesActionTypes){

    switch(action.type){            
        case matchesActions.UPDATE_MATCHES:
            return {
                ...state, 
                nbaMatches: action.payload.nbaMatches,
                ufcMatches: action.payload.ufcMatches,
                uefaMatches: action.payload.uefaMatches
            }
        default: 
            return state;  
    }
} 
