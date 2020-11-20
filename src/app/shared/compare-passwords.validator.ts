import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const customPassValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  let pass = control.get('password').value;
  let confirmPass = control.get('confirmPass').value;

  return pass === confirmPass ? null : { notSame: true };
};
