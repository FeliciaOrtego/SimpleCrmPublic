import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'crm-customer-create-dialog',
  templateUrl: './customer-create-dialog.component.html',
  styleUrls: ['./customer-create-dialog.component.scss']
})
export class CustomerCreateDialogComponent implements OnInit {
  detailForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer | null

  ) {
    this.detailForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['',Validators.required],
      phoneNumber: [''],
      emailAddress: ['', [Validators.required, Validators.email]],
      preferredContactMethod: ['email']
   });
   if(this.data){
     this.detailForm.patchValue(this.data);
   }
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (!this.detailForm.valid) {
      return;
    }
    const customer = { ...this.data, ...this.detailForm.value };
   // this.dialogRef.close(customer);

    this.customerService.insert(customer)
      .subscribe(result => {
        if (!result) {
          this.snackBar.open('Error creating customer.', 'OOPS');
          return;
        }
        this.snackBar.open('Customer created', 'OK');
       });

    }
}
