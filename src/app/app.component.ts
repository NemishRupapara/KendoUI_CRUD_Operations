import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Product } from './model';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';
import { Button } from '@progress/kendo-angular-buttons';
import { AdaptiveMode } from "@progress/kendo-angular-dateinputs";
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  pname: string = '';
  localstoragearray: Product[] = [];
  public products: Product[] = [];
  public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  public itemToRemove: Product;
  // public globalRemainingStock: number = 0; // Global variable for remainingstock

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
    this.removeConfirmation = this.removeConfirmation.bind(this);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? new Product() : args.dataItem;

    const formGroup = this.formBuilder.group({

      'ProductName': [item.ProductName, Validators.required],
      'UnitPrice': item.UnitPrice,
      'UnitsInStock': [item.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])],
      'sell': item.sell,
      // 'remainingstock': this.globalRemainingStock
      'remainingstock': item.remainingstock

    });

    
    formGroup.get('sell')?.valueChanges.subscribe(() => {
      const remainingstock = formGroup.get('UnitsInStock')?.value - (formGroup.get('sell')?.value as number);
      formGroup.get('remainingstock')?.patchValue(remainingstock as number);
    });

    formGroup.get('UnitsInStock')?.valueChanges.subscribe(() => {
      const remainingstock = formGroup.get('UnitsInStock')?.value - (formGroup.get('sell')?.value as number);
      formGroup.get('remainingstock')?.patchValue(remainingstock as number);
    });


    return formGroup;
  }

  private nextAvailableId: number = 1;
  ngOnInit(): void {
    // this.localstoragearray=this.products
    const storedData = localStorage.getItem('products1');
    if (storedData) {
      this.localstoragearray = JSON.parse(storedData);
      this.products = JSON.parse(storedData);

    }
  }

  public handleSave(event: any): void {
    let editedData = event.dataItem;

    // Calculate remainingstock
    // this.globalRemainingStock = editedData.UnitsInStock - editedData.sell;

    if (!editedData.ProductID) {
      // Assign a unique ID for new products
      editedData.ProductID = this.nextAvailableId;
      this.nextAvailableId++;
    }
    const existingItemIndex = this.localstoragearray.findIndex(item => item.ProductID === editedData.ProductID);

    if (existingItemIndex !== -1) {
      // Update existing item
      // editedData.remainingstock = this.globalRemainingStock;
      this.localstoragearray[existingItemIndex] = editedData;
      // console.log('Array:', this.products);

    } else {
      // Add new item to the array
      // editedData.remainingstock = this.globalRemainingStock;
      // this.localstoragearray.push(editedData);
      // console.log('Array:', this.products);
      this.localstoragearray.push(editedData);
      
    }
    // this.localstoragearray=this.products
setTimeout(()=>{localStorage.setItem('products1', JSON.stringify(this.localstoragearray));},500)
    // localStorage.setItem('products1', JSON.stringify(this.localstoragearray));
    console.log('Products saved to localStorage:', this.localstoragearray);
   
  }
  // (remove)="handleRemove($event)"
  public confirmRemove(shouldRemove: boolean): void {
    if (shouldRemove) {
      if (this.itemToRemove) {
        // Find the index of the item to remove
        const indexToRemove = this.localstoragearray.findIndex(item => item.ProductID === this.itemToRemove.ProductID);
        
        if (indexToRemove !== -1) {
          // Remove the item from localstoragearray
          this.localstoragearray.splice(indexToRemove, 1);
          
          // Update localStorage with the modified array
          localStorage.setItem('products1', JSON.stringify(this.localstoragearray));
        }
      }
    }
    
    // Reset the itemToRemove and notify the confirmation
    this.itemToRemove = null;
    this.removeConfirmationSubject.next(shouldRemove);
  }
  
  public removeConfirmation(dataItem: Product): Subject<boolean> {
    this.itemToRemove = dataItem;

    return this.removeConfirmationSubject;
  }
  
  //   public handleDelete(product: Product): void {
  //     const index = this.products.indexOf(product);
  //     if (index !== -1) {
  //       this.products.splice(index, 1);
  //       // Update localStorage
  //       localStorage.setItem('products', JSON.stringify(this.products));
  //     }
  //   }
  // check() {
  //   let data = [{ id: 1, name: 'nemish' }]
  //   localStorage.setItem('hello', JSON.stringify(data));
  // }

  // public value: Date = new Date(2000, 2, 10);
  // public adaptiveMode: AdaptiveMode = "auto";
  // public value1: Date;
  // public value2: Date; 

  // dateDifference: string;
  
 
    // calculateDate() {
    //   if (this.value1 && this.value2) {
    //     const diffTime = Math.abs(this.value2.getTime() - this.value1.getTime());
    //     const diffDate = new Date(diffTime);
  
    //     const years = diffDate.getUTCFullYear() - 1970;
    //     const months = diffDate.getUTCMonth();
    //     const days = diffDate.getUTCDate() - 1; // Adjust for the 0-based day count
  
    //     // Format the difference as "x years y months z days"
    //     this.dateDifference = `${years} years ${months} months ${days} days`;
    //   } else {
    //     this.dateDifference = 'Select both dates';
    //   }
    // }

}


