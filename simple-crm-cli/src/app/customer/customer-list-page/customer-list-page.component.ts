import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { CustomerService } from '../customer.service';
import {combineLatest, Observable } from 'rxjs';
import {debounceTime, map, switchMap, startWith} from 'rxjs/operators'
import { CustomerCreateDialogComponent } from '../customer-create-dialog/customer-create-dialog.component';
import {MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';



@Component({
  selector: 'crm-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss']
})
 export class CustomerListPageComponent implements OnInit {
    filteredCustomers$: Observable<Customer[]>;
    displayColumns = [ 'icon', 'name', 'phone', 'email', 'status', 'contact', 'actions'];
    filterInput = new FormControl();

    constructor(private customerService: CustomerService,
      private router: Router,
      public dialog: MatDialog,
      private accountService: AccountService) {
      this.filteredCustomers$ = this.filterInput.valueChanges.pipe(
        startWith(''),
        debounceTime(700),
        switchMap((filterTerm: string) => {
          return this.customerService.search(filterTerm);
        })
      );
    }

 ngOnInit(): void{

 }
 openDetail(item: Customer): void {
  if (item) {
    this.router.navigate([`./customer/${item.customerId}`]);
  }
}
 addCustomer(): void{
   const dialogRef = this.dialog.open(CustomerCreateDialogComponent,{
     width: '250px',
     data: null
   });
 }
 logout(): void  {
  this.accountService.logout( {navigate: true});
  this.router.navigate(['login'])
}
loggedIn(): boolean {
  let user = this.accountService.user;

  if (user &&
      user.value.name != 'Anonymous')
    return  true;
  else
  return false;
}
}
