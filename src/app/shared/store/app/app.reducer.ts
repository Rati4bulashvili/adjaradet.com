import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/auth.reducer';
import * as fromMatches from '../matches/matches.reducer';
import * as fromAccountData from '../account-data/account-data.reducer';
import { AllSportsMatches } from '../../models/all-sports-matches.model';
import { AccountData } from '../../models/account-data.model';
import { Auth } from '../../models/auth.model';

export interface AppState {
  auth: Auth;
  matches: AllSportsMatches;
  accountData: AccountData;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  matches: fromMatches.MatchesReducer,
  accountData: fromAccountData.AccountDataReducer,
};
