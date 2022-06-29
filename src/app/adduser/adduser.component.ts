import { Component, Inject, OnInit } from '@angular/core';

import { Validators , FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})



export class AdduserComponent implements OnInit {
  registerForm !: FormGroup;

  Gender !: string ;
  gTypes : string[] = ['Male','Female','Transgender'] 
  actionbtn : string = "Save";

  constructor(
    private formBuilder :FormBuilder,
    private dialog : MatDialogRef<AdduserComponent>,
    private $service :ApiService,
    @Inject(MAT_DIALOG_DATA) public editdata:any
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [null,[Validators.required,Validators.min(2)]],
      lastName:[null,[Validators.required,Validators.min(2)]],
      email:[null,[Validators.required,Validators.email,Validators.min(6)]],
      phone:[null,[Validators.required,Validators.minLength(10),Validators.maxLength(13)]],
      date:[null,[Validators.required,Validators.min(2)]],
      gender:[null,[Validators.required]],
      address:[null,[Validators.required,Validators.min(7),Validators.max(25)]],
      city:[null,[Validators.required,Validators.min(4)]],
      state:[null,[Validators.required,Validators.min(4)]],
      portelcode:[null,[Validators.required,Validators.min(6)]]
    })

    // console.log('this .editdata',this.editdata);
    // this.registerForm.firstName  = this.editdata
  
    if(this.editdata){
      this.actionbtn = "Update"
      this.registerForm.controls['firstName'].setValue(this.editdata.firstName);
      this.registerForm.controls['lastName'].setValue(this.editdata.lastName);
      this.registerForm.controls['email'].setValue(this.editdata.email);
      this.registerForm.controls['phone'].setValue(this.editdata.phone);
      this.registerForm.controls['date'].setValue(this.editdata.date);
      this.registerForm.controls['gender'].setValue(this.editdata.gender)
      this.registerForm.controls['state'].setValue(this.editdata.state);
      this.registerForm.controls['city'].setValue(this.editdata.city);
      this.registerForm.controls['address'].setValue(this.editdata.address);
      this.registerForm.controls['portelcode'].setValue(this.editdata.portelcode);

    }
  }
  

  onSubmit(){
    if(this.registerForm.valid && this.actionbtn != 'Update'){
      this.$service.createuser(this.registerForm.value).subscribe({
        next:((res)=>{
          alert('user created successfully..!!!')
          this.registerForm.reset();
          this.dialog.close();
          
        }),
        error:((err)=>{
          alert('facing an error')
          console.log('err',err);
            
        }),complete:(()=>{
          console.log('we are in completed state');
          this.$service.tableupdate()
          
        })
        
      })
    }else{
      // console.log('editdata',this.registerForm.value.id);
      this.$service.updateuser(this.registerForm.value,this.editdata.id).subscribe({
        next:((res)=>{
          console.log('res---------',res);
          this.dialog.close();
        }),error:((err)=>{
          console.error('cannot update the user',err);
          
        }),complete:(()=>{
          this.$service.tableupdate()
        })
      })
      
      
    }
  }
}
