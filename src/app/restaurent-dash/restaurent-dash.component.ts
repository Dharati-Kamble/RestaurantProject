import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {RestaurentData} from './restaurent.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
  standalone : false
})

export class RestaurentDashComponent implements OnInit {

  formValue!:FormGroup
  restaurentModelObj : RestaurentData = new RestaurentData;
  allRestaurentData: any;
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],  // Name validation (required, min length 3)
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$')]], // Email validation (required, email pattern)
      mobile: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],  // Mobile validation (required, 10 digits)      
      address: [''],
      services: [''],
    })
    this.getAllData();
  }

  clickAddResto()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = true;
  }
 
      addRestaurent() {
        // Check if the form is valid before submitting
        if (this.formValue.invalid) {
          alert('Please fill in all required fields!');
          return;
        }
        // Map form values to `restaurentModelObj`
        this.restaurentModelObj.name = this.formValue.value.name;
        this.restaurentModelObj.email = this.formValue.value.email;
        this.restaurentModelObj.mobile = this.formValue.value.mobile || 0;  // Handle undefined values
        this.restaurentModelObj.address = this.formValue.value.address;
        this.restaurentModelObj.services = this.formValue.value.services;
      
        // Call the service to add the restaurant
        this.api.addRestaurent(this.restaurentModelObj).subscribe(
          (res) => {
            console.log('Restaurant added:', res);
            alert('Restaurant Added Successfully');
      
            // Reset the form and close the modal
            this.formValue.reset();
            let ref = document.getElementById('close');
            ref?.click();
      
            // Refresh the list of restaurants
            this.getAllData();
          },
          (err) => {
            console.error('Error adding restaurant:', err);
            alert('Failed to Add Restaurant');
          }
        );
      }
      get name() {
        return this.formValue.get('name');
      }
    
      get email() {
        return this.formValue.get('email');
      }
    
      get mobile() {
        return this.formValue.get('mobile');
      }
    
    

  getAllData()
  {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData= res;
    }, err=>{
      console.log(err);
    })
  }

  deleteResto(data: any)
  {
    this.api.deleteRestaurant(data).subscribe((res: any) => {
      console.log(res);
      alert("Restaurent Deleted Successfully");
      this.getAllData();
    })
  }

  onEditResto(data: any) {
    this.showAdd = false;
    this.showBtn = true;
    
    // Ensure `id` is a string
    this.restaurentModelObj.id = data._id.toString(); // Convert id to string
  
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services); 
  }
  
  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj.id,this.restaurentModelObj).subscribe((res: any) => {
      alert("Restaurent Updated Successfully");
      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();

      this.getAllData();

    })
    
  }

  
}
