import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';
import { CustomerService } from '../customer.service';
import { searchCustomerAction, searchCustomerCompleteAction } from './customer.store';

// ngrx effects that trigger side effects for specific actions.
@Injectable()
export class CustomerStoreEffects {
  constructor(
    private actions$: Actions, // <-- this event stream is where to listen for dispatched actions
    private custSvc: CustomerService // <-- this is your service to be called for some actions
  ) { }

  // TODO: add effect functions here
  searchCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(searchCustomerAction),
    switchMap(({criteria}) =>  // <-- NEW, use rxjs, accept action payload
      this.custSvc.search(criteria.term).pipe(  // <-- NEW, make service call
        map( // <-- NEW: create action payload with API response data
          data => searchCustomerCompleteAction({result: data})
        )
      )
    )
  ));
}
