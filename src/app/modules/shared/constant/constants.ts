export enum RegexpPattern {
  FirstLastName = "^(?!\\s*$)[0-9aA-zZ\\-.^'äöüÄÖÜáéíóúÁÉÍÓÚñÑ\\s]*$",
  PhoneNumber = "^((?![(]000[)] 000-0000).)*$"
}

export const PhoneNumberLength = {
  length: 10,
};
