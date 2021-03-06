import {Injectable} from "@angular/core";
import {ValidationRules} from "app/shared/validation-rules.model";
import {TranslateService} from "@ngx-translate/core";
import {FormGroup} from "@angular/forms";
@Injectable()
export class ValidationService {
  private lengthMessage: string;

  constructor(private translateService: TranslateService) {
  }

  public getValidatorErrorMessage(validatorKey: string, validatorValue?: any, customMessage?: string): string {
    switch (validatorKey) {
      case ValidationRules.REQUIRED_KEY:
        return ValidationRules.REQUIRED_MESSAGE;
      case ValidationRules.REQUIRED_TRUE_KEY:
        return ValidationRules.REQUIRED_TRUE_MESSAGE;
      case ValidationRules.EMAIL_KEY:
        return ValidationRules.EMAIL_MESSAGE;
      case ValidationRules.MIN_LENGTH_KEY:
        this.getLimitedLengthErrorMessage("SHARED.VALIDATION_RULES.MIN_LENGTH_ERROR_MESSAGE", validatorValue.requiredLength);
        return this.lengthMessage;
      case ValidationRules.MAX_LENGTH_KEY:
        this.getLimitedLengthErrorMessage("SHARED.VALIDATION_RULES.MAX_LENGTH_ERROR_MESSAGE", validatorValue.requiredLength);
        return this.lengthMessage;
      case ValidationRules.PATTERN_KEY:
        return customMessage;
      case ValidationRules.INVALID_PAST_DATE_KEY:
        return ValidationRules.INVALID_PAST_DATE_MESSAGE;
      case ValidationRules.ONE_EMAIL_REQUIRED_KEY:
        return ValidationRules.ONE_EMAIL_REQUIRED_MESSAGE;
    }
  }

  static pastDateValidator(control) {
    const today = new Date();
    if (control.value < today) {
      return null;
    } else {
      return {'invalidPastDate': true};
    }
  }

  private getLimitedLengthErrorMessage(errorMessage: string, requiredLength: any) {
    this.translateService.get(errorMessage, {length: requiredLength})
      .subscribe(
        (res: string) => {
          this.lengthMessage = res;
        }
      );
  }

  static oneEmailRequired(homeEmailKey: string, registrationPurposeEmailKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let homeEmail = group.controls[homeEmailKey];
      let registrationPurposeEmail = group.controls[registrationPurposeEmailKey];

      if (homeEmail.value === '') homeEmail.setValue(null);
      if (registrationPurposeEmail.value === '') registrationPurposeEmail.setValue(null);

      if ((homeEmail.touched || homeEmail.dirty )&&(registrationPurposeEmail.dirty || registrationPurposeEmail.touched)) {
        if (homeEmail.value == null && registrationPurposeEmail.value == null) {
          return {
            oneEmailRequired: true
          }
        }
      }
    }
  }
}
