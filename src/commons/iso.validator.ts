import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsISO8601StrictConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    return typeof value === 'string' && iso8601Regex.test(value);
  }

  defaultMessage(): string {
    return 'Date ($value) must be a valid ISO 8601 string (YYYY-MM-DDTHH:mm:ss.sssZ)';
  }
}

export function IsISO8601Strict(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsISO8601StrictConstraint,
    });
  };
}
