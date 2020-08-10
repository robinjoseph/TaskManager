import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { CountriesService } from '../../services/countries.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { SignUpViewModel } from '../../models/sign-up-view-model';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate-guard.service';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, CanComponentDeactivate {
  signUpForm : FormGroup;
  genders =["male", "female"];
  countries: Country[] =[];
  registerError: string= null;

  canLeave: boolean= true;

  constructor(private countriesService: CountriesService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit()
  {
    debugger;
    this.countriesService.getCountries().subscribe(      
      (response: Country[])=> {
        debugger;
        this.countries = response;
      }
    );

/*     this.signUpForm = new FormGroup({
      personName: new FormGroup({
        firstName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
        lastName: new FormControl(null,[Validators.required,Validators.minLength(2)])
      }),
     
      email: new FormControl(null,[Validators.required,Validators.email]),
      mobile: new FormControl(null,[Validators.required,Validators.pattern(/^[789]\d{9}$/)]),
      dateOfBirth: new FormControl(null,[Validators.required]),
      gender: new FormControl(null,[Validators.required]),
      countryID: new FormControl(null,[Validators.required]),
      receiveNewsLetters: new FormControl(null),
      skills: new FormArray([])
    }); */

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null,[Validators.required,Validators.minLength(2)]],
        lastName: [null,[Validators.required,Validators.minLength(2)]]
      }),
     
      email: [null,[Validators.required,Validators.email]],
      mobile: [null,[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth: [null,[Validators.required]],
      gender: [null,[Validators.required]],
      countryID: [null,[Validators.required]],
      receiveNewsLetters: null,
      skills: this.formBuilder.array([])
    });

    this.signUpForm.valueChanges.subscribe((value)=>{
      console.log(value);
      this.canLeave = false;
    });
  }

  onSubmitClick()
  {
    debugger;
    this.signUpForm["submitted"] = true;
    console.log(this.signUpForm);
    if(this.signUpForm.valid)
    {
      var signUpViewModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpViewModel).subscribe(
        (response)=>{
          this.canLeave = true;
          this.router.navigate(["/employee","tasks"]);
        },
        (error) => {
          console.log(error);
          this.registerError = "Unable to submit";
        }
      );
    }
  }

  onAddSkill()
  {
    var formGroup = new FormGroup({
      skillName: new FormControl(null,[Validators.required]),
      level: new FormControl(null,[Validators.required])
    });

    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
  }

  onRemoveClick(index: number)
  {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }
}
