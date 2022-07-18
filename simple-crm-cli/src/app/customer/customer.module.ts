import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListPageComponent } from './customer-list-page/customer-list-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerCreateDialogComponent } from './customer-create-dialog/customer-create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { StatusIconPipe } from './status-icon.pipe';
import { MatListModule } from '@angular/material/list';
import { EffectsModule } from '@ngrx/effects';
import { CustomerStoreEffects } from './store/customer.store.effects';
import { StoreModule } from '@ngrx/store';
import { customerFeatureKey, customerReducer } from './store/customer.store';
import { AccountModule } from '../account/account.module';

@NgModule({
  declarations: [
   CustomerListPageComponent,
   CustomerCreateDialogComponent,
   CustomerDetailComponent,
   StatusIconPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomerRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    AccountModule,
    EffectsModule.forFeature([CustomerStoreEffects]),
    StoreModule.forFeature(customerFeatureKey, customerReducer),
  ],
  providers: [
    {
  provide: CustomerService,
  useClass: CustomerService
  }]
})
export class CustomerModule { }
