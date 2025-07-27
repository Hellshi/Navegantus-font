export type PatientResponse = {
  id: string;
  name: string;
  socialName: string;
  birthDate: string;
  mothersName: string;
  rg: string;
  cpf: string;
  birthSex: string;
  email: string;
  phone: string;
  whatsappPhone: string;
  address: {
    cep: string;
    city: string;
    state: string;
    neighborhood: string;
  };
  addressId: string | null;
  susIdCard: string | null;
  healthInsurance: string
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type CreatePatientDto = {
  name: string;
  social_name: string;
  birth_date: string;
  mothers_name: string;
  rg: string;
  cpf: string;
  sus_id_card: string;
  health_insurance: string;
  birthSex: string;
  email: string;
  phone: string;
  whatsapp_phone: string;
  address: {
    cep: string;
    city: string;
    state: string;
    neighborhood: string;
  };
};