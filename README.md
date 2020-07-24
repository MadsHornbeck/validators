# @hornbeck/react-form

![npm](https://img.shields.io/npm/v/@hornbeck/validators)
![npm](https://img.shields.io/npm/l/@hornbeck/validators)
![npm](https://img.shields.io/npm/dw/@hornbeck/validators)
![npm bundle size](https://img.shields.io/bundlephobia/min/@hornbeck/validators)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@hornbeck/validators)

Validator functions for usage in form.

```bash
npm install --save @hornbeck/validators
```

## Documentation

All the functions are automatically curried and should be easy to use for any usecase.

This is to allow for variable amount of prefilling of values.
All of the functions can be called in any of the follow ways.

```
import { max } from "@hornbeck/validators";

const max12 = max(12);

const max12WithMessage = max12("Message");

const max13WithMessage = max(13, "Message");

// Return "Message" if `a` is smaller than 12, otherwise undefined.

max12WithMessage(a);
max12("Message", a);
max(12, "Message", a);
max(12)("Message")(a);
```

- required
- maxLength
- minLength
- max
- min
- pattern
- positive
- negative

- creditCard - validate the format of credit card number. (disclaimer: this only verifies that a credit card number matches the format, it does _not_ validate or verify the creditcard is actually usable)
- guid
- email

- validateFn - a helper for creating your own validation functions

Note: the following two validators are made specifically for @hornbeck/react-form, but a similar thing can probably be done for any other form handling package you use.

- smaller
- greater
