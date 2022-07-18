import { Action, createAction, createReducer, props, on } from "@ngrx/store";
import { Customer } from "../customer.model";
import { customerSearchCriteria, CustomerState, initialCustomerState } from "./customer.store.model";

export const searchCustomerAction = createAction(
  '[Customer] search customers',
  props<{ criteria: customerSearchCriteria }>()
);

export const searchCustomerCompleteAction = createAction(
  '[Customer] search complete',
  props<{result: Customer[]}>()
);

export const customerFeatureKey = 'customer';

const rawCustomerReducer = createReducer(
  initialCustomerState,
  on(searchCustomerAction, (state, action) => ({
    ...state,
    criteria: action.criteria,
    searchStatus: 'searching'
  })),
)

export function customerReducer(state: CustomerState, action: Action) {
  return rawCustomerReducer(state, action);
};
