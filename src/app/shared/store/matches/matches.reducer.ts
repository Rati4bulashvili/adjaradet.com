import * as matchesActions from '../matches/matches.actions'
import { Match } from "../../models/match.model";
import { AllSportsMatches } from '../../models/all-sports-matches.model';

const currentState: AllSportsMatches = null;

export function MatchesReducer(state: AllSportsMatches = currentState, action: matchesActions.matchesActionTypes){

    switch(action.type){            
        case matchesActions.UPDATE_MATCHES:
            return action.payload;

        default: 
            return state;  
    }
} 
