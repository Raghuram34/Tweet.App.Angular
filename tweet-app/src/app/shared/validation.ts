import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
}

export function matchPassword() : ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  }
}