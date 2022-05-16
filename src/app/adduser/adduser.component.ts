import { Component, OnInit } from '@angular/core';

import { Validators , FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})



export class AdduserComponent implements OnInit {
  registerForm !: FormGroup;

  Gender !: string ;
  gTypes : string[] = ['Male','Female','Transgender'] 

  constructor(
    private formBuilder :FormBuilder,
    // private 
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [null,[Validators.required,Validators.min(2)]],
      lastName:[null,[Validators.required,Validators.min(2)]],
      email:[null,[Validators.required,Validators.email,Validators.min(6)]],
      phone:[null,[Validators.required,Validators.minLength(10),Validators.maxLength(13)]],
      date:[null,[Validators.required,Validators.min(2)]],
      gender:[null,[Validators.required]],
      address:[null,[Validators.required,Validators.min(7)]],
      city:[null,[Validators.required,Validators.min(4)]],
      state:[null,[Validators.required,Validators.min(4)]],
      portelcode:[null,[Validators.required,Validators.min(5)]]

    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      alert('Form Submitted SuccessFully!!!');
      console.table(this.registerForm.value)
    }else{
      
    }
  }
}
