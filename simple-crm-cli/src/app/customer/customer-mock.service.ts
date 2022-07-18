import { SelectorMatcher } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';


@Injectable()
export class CustomerMockService extends CustomerService {
  customers: Customer[] = [];
  lastCustomerId!: number;

  constructor(http: HttpClient) {
    super(http);
    console.warn('Warning: You are using the CustomerMockService, not intended for production use.');


    const localCustomers = localStorage.getItem('customers');
    if (localCustomers) {
      this.customers = JSON.parse(localCustomers);
    } else {
      this.customers.push({
        customerId: 1,
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: '314-555-1234',
        emailAddress: 'john@nexulacademy.com',
        statusCode: 'Prospect',
        preferredContactMethod: 'phone',
        lastContactDate: new Date().toISOString()
      });
    }

    this.lastCustomerId = Math.max(...this.customers.map(x => x.customerId));
  }

  override search(term: string): Observable<Customer[]> {
    const items = this.customers.filter(x =>
      (x.firstName + ' ' + x.lastName).indexOf(term) >= 0
      || x.phoneNumber.indexOf(term) >= 0
      || x.emailAddress.indexOf(term) >= 0);
    return of(items);
  }


  override insert(customer: Customer): Observable<Customer> {
    customer.customerId = Math.max(...this.customers.map(x => x.customerId)) +1;
    this.customers = [...this.customers, customer];
    localStorage.setItem('customers', JSON.stringify(this.customers));
    return of(customer);
  }

  override update(customer: Customer): Observable<Customer> {
    const match = this.customers.find(x => x.customerId === customer.customerId);
    if (match) {
      this.customers = this.customers
        .map(x => x.customerId === customer.customerId ? customer : x);
    } else {
      this.customers = [...this.customers, customer];
    }
    localStorage.setItem('customers', JSON.stringify(this.customers))
    return of(customer);
  }

   override get(customerId: number): Observable<Customer | undefined> {
    const item = this.customers.find(x => x.customerId === customerId);
    return of(item);
  }

}
