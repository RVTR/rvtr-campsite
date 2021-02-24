interface PatternMessage {
  pattern: RegExp;
  errorMessage: string;
}
const validationConfig: { [key: string]: PatternMessage } = {};

validationConfig.creditCard = {
  pattern: /\d{4}-?\d{4}-?\d{4}-?\d{4}/,
  errorMessage: 'Please enter a valid credit card number ex: 1234-1234-1234-1234',
};
validationConfig.name = {
  pattern: /^[a-zA-Z]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/,
  errorMessage: 'Names cannot contain punctuation, spaces, or numbers',
};
validationConfig.city = {
  pattern: /^([A-Za-z ]{3,})+$/,
  errorMessage: 'Please enter a valid city ex. New York',
};
validationConfig.date = {
  pattern: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
  errorMessage: 'Please enter a valid date in the format dd/mm/yyyy',
};
validationConfig.state = {
  pattern: /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/,
  errorMessage: 'Please enter a valid US state ex. NY',
};
validationConfig.street = {
  pattern: /^([#.0-9a-zA-Z\s,-]{3,})+$/,
  errorMessage: 'Please enter a valid street address',
};
validationConfig.postal = {
  pattern: /^[0-9]{5}$/,
  errorMessage: 'Please enter a valid zip code ex. 12345',
};
validationConfig.country = {
  pattern: /^([A-Z]{2,})+$/,
  errorMessage: 'Please enter a valid country ex. USA',
};
validationConfig.cardNumber = {
  pattern: /\d{16}/,
  errorMessage: 'Please enter a valid credit card number ex: 1234123412341234',
};
validationConfig.cardExpirationDate = {
  pattern: /^(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
  errorMessage: 'Please enter a valid expiration date in the fomration mm/yyyy',
};

export default validationConfig;
