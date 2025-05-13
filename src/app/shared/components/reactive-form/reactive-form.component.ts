import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { validationsPatterns } from '../../validators/pattern';
import { noSpaceBar } from '../../validators/noSpaceBarValidator';
import { EMPIdValidator } from '../../validators/employeeValidators';
import { Icountry } from '../../models/country';
import { COUNTRIES_META_DATA } from '../../consts/countries';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  signUpForm!: FormGroup;
  RadioButtonArray: Array<string> = ['male', 'female', 'others'];
  countryData: Array<Icountry> = COUNTRIES_META_DATA;
  constructor() {}

  ngOnInit(): void {
    this.createSignUpform();
    this.onSkillAdd();
    this.addDependents();
    this.addPatchHandler();
    this.isAddSameHandler();
    this.confirmPasswordHandler();
    this.confirmPasswordValidation();
  }

  createSignUpform() {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern(validationsPatterns.onlyText),
        Validators.maxLength(16),
        noSpaceBar.noSpace,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(validationsPatterns.email),
      ]),
      empID: new FormControl(null, [
        Validators.required,
        EMPIdValidator.isEmpIdValid,
      ]),
      gender: new FormControl(null),
      currentAddress: new FormGroup({
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        country: new FormControl('India', [Validators.required]),
        pincode: new FormControl(null, [Validators.required]),
      }),
      permanentAddress: new FormGroup({
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        country: new FormControl('India', [Validators.required]),
        pincode: new FormControl(null, [Validators.required]),
      }),
      isAddSame: new FormControl({ value: false, disabled: true }),
      skills: new FormArray([]),
      dependents: new FormArray([]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(validationsPatterns.password),
      ]),
      confirmPassword: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    }
  }
  // this function handles weather the add is same or not
  isAddSameHandler() {
    this.formControls['currentAddress'].valueChanges.subscribe((res) => {
      if (this.formControls['currentAddress'].valid) {
        this.formControls['isAddSame'].enable();
      } else {
        this.formControls['isAddSame'].disable();
      }
    });
  }

  addPatchHandler() {
    this.formControls['isAddSame'].valueChanges.subscribe((res: Boolean) => {
      if (res === true) {
        let currentAddressData = this.formControls['currentAddress'].value;
        this.formControls['permanentAddress'].patchValue(currentAddressData);
        this.formControls['permanentAddress'].disable();
      } else {
        this.formControls['permanentAddress'].reset();
        this.formControls['permanentAddress'].enable();
      }
    });
  }

  onSkillRemove(i: number) {
    this.skillArray.removeAt(i);
  }

  onSkillAdd() {
    if (this.skillArray.length < 5) {
      let skillControl = new FormControl(null, [Validators.required]);
      this.skillArray.push(skillControl);
    }
  }

  addDependents() {
    let dependentGroup = new FormGroup({
      fullName: new FormControl(null, [Validators.required]),
      relationship: new FormControl(null, [Validators.required]),
      citizenship: new FormControl(null, [Validators.required]),
      isTravelingWithYou: new FormControl(null, [Validators.required]),
    });
    this.dependentsArray.push(dependentGroup);
  }

  onDependentRemove(i: number) {
    this.dependentsArray.removeAt(i);
  }

  confirmPasswordHandler() {
    this.formControls['password'].valueChanges.subscribe((res) => {
      if (this.formControls['password'].valid) {
        this.formControls['confirmPassword'].enable();
      } else {
        this.formControls['confirmPassword'].disable();
        this.formControls['confirmPassword'].reset();
      }
    });
  }

  confirmPasswordValidation() {
    this.formControls['confirmPassword'].valueChanges.subscribe((res) => {
      if (this.formControls['password'].value === res) {
        this.formControls['confirmPassword'].setErrors(null);
      } else {
        this.formControls['confirmPassword'].setErrors({
          passAndConfirmPass: `Password and confirm password must be same`,
        });
      }
    });
  }

  get formControls() {
    return this.signUpForm.controls;
  }

  get skillArray() {
    return this.formControls['skills'] as FormArray;
  }

  get dependentsArray() {
    return this.formControls['dependents'] as FormArray;
  }
}
