import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureStateNames } from "src/app/shared/enums/feature-state-names";
import { Auth } from "src/app/shared/models/auth.model";

const getAuthState = createFeatureSelector<Auth>(FeatureStateNames.auth);

export const getMailState = createSelector(
  getAuthState,
  (state: Auth) => state?.email
);

export const getPasswordState = createSelector(
  getAuthState,
  (state: Auth) => state?.password
);