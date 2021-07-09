import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureStateNames } from "src/app/shared/enums/feature-state-names";
import { AccountData } from "src/app/shared/models/account-data.model";

const getAccountDataState = createFeatureSelector<AccountData>(FeatureStateNames.accountData);

export const getBalanceState = createSelector(
  getAccountDataState,
  (state: AccountData) => state?.balance
);

export const getBetsHistoryState = createSelector(
  getAccountDataState,
  (state: AccountData) => state?.betsHistory
);

export const getPlacingBetState = createSelector(
  getAccountDataState,
  (state: AccountData) => state?.placingBet
);