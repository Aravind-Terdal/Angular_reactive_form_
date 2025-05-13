import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EMPIdValidator {
  static isEmpIdValid(control: AbstractControl): ValidationErrors | null {
    let val: string = control.value;
    if (!val) {
      return null;
    }
    let regularExp = /^[A-Z]\d{3}$/;
    let isValid = regularExp.test(val);
    if (isValid) {
      return null;
    } else {
      return {
        invalidEmpId: `Invalid Emp ID`,
      };
    }
  }
}
