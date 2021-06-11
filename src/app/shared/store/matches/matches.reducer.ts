import * as matchesActions from '../matches/matches.actions'
import { Match } from "../../models/match-details.model";
import { Matches } from '../../models/matches.model';

const currentState: Matches = null;

export function MatchesReducer(state: Matches = currentState, action: matchesActions.matchesActionTypes){

    switch(action.type){            
        case matchesActions.UPDATE_MATCHES:
            return action.payload;

        default: 
            return state;  
    }
} 
