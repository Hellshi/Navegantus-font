import { Formik, Form } from "formik";
import * as Yup from "yup";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BaseUserGroup from "../../components/form/form-elements/BaseUserGroup";
import DefaultAddress from "../../components/form/form-elements/Address";
import BaseEmployeeGroup from "../../components/form/form-elements/BaseEmployeeGroup";

const initialValues = {
  name: "",
  social_name: "",
  birth_date: "",
  mothers_name: "",
  rg: "",
  cpf: "",
  sus_id_card: "",
  health_insurance: "",
  birthSex: "",
  email: "",
  phone: "",
  whatsapp_phone: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  social_name: Yup.string().optional(),
  birth_date: Yup.date()
    .required("Data de nascimento é obrigatória")
    .typeError("Data inválida"),
  mothers_name: Yup.string().optional(),
  rg: Yup.string().required("RG é obrigatório"),
  cpf: Yup.string()
    .required("CPF é obrigatório")
    .matches(/^\d{11}$/, "CPF deve ter 11 dígitos numéricos"),
  sus_id_card: Yup.string().optional(),
  health_insurance: Yup.string().optional(),
  birthSex: Yup.mixed()
    .oneOf(["Masculino", "Feminino"], "Sexo inválido")
    .required("Sexo de nascimento é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
  whatsapp_phone: Yup.string().optional(),
  cep: Yup.string().required("CEP é obrigatório"),
  city: Yup.string().required("Cidade é obrigatória"),
  state: Yup.string().required("Estado é obrigatório"),
  neighborhood: Yup.string().required("Bairro é obrigatório"),
});

export default function DoctorFormRegister() {
  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form values:", values);
  };

  return (
    <div>
      <PageMeta
        title="Navegantus"
        description="Navegantus"
      />
      <PageBreadcrumb pageTitle="Registro de Funcionário" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="space-y-6">
                <BaseUserGroup />
                {/* <DefaultInputs />
                <SelectInputs />
                <TextAreaInput />
                <InputStates /> */}
              </div>
              <div className="space-y-6">
                <BaseEmployeeGroup/>
                <DefaultAddress />
                {/* <InputGroup />
                <FileInputExample />
                <CheckboxComponents />
                <RadioButtons />
                <ToggleSwitch />
                <DropzoneComponent /> */}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="rounded bg-primary px-4 py-2"
              >
                Enviar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
