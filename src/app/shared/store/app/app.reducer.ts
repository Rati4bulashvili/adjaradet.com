import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../../../navbar/store/auth/auth.reducer';
import * as fromMatches from '../../../sportsbook/matches-list/store/matches/matches.reducer';
import * as fromAccountData from '../../../navbar/store/account-data/account-data.reducer';
import { AllSportsMatches } from '../../models/all-sports-matches.model';
import { AccountData } from '../../models/account-data.model';
import { Auth } from '../../models/auth.model';

export interface AppState {
  auth: Auth;
  matches: AllSportsMatches;
  accountData: AccountData;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  matches: fromMatches.reducer,
  accountData: fromAccountData.reducer,
};
