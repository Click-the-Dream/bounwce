export type OnboardingFormValues = {
  name: string;
  email: string;
  address: string;
  phone_number: string;
  contact_info: {
    name: string;
    title: string;
    email: string;
    phone_number: string;
  };
  id_number: string;
  payout_info: {
    account_name: string;
    account_number: string;
    bank_name: string;
    withdrawal_pin: string;
    security_question: string;
    security_answer: string;
  };
};
