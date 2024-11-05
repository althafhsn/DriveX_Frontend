import { FormControl, FormGroup } from "@angular/forms";

export default class valdateForm{
    static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(f => {
          const control = formGroup.get(f);
          if (control instanceof FormControl) {
            control.markAsDirty({ onlySelf: true });
          } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control)
          }
        })
    }
}