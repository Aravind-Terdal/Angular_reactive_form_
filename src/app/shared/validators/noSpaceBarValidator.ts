import { AbstractControl, ValidationErrors } from "@angular/forms";

export class noSpaceBar{
    static noSpace(control:AbstractControl):ValidationErrors | null{
        let val = control.value as string;
        if(!val){
            return null
        }
        if(val.includes(' ')){
            return {
                noSpace : `Space is not allowed`
            }
        }else{
            return null
        }
    }
}