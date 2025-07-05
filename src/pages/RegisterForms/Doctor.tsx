import { Formik, Form } from "formik";
import * as Yup from "yup";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import InputGroup from "../../components/form/form-elements/InputGroup";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
import RadioButtons from "../../components/form/form-elements/RadioButtons";
import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import InputStates from "../../components/form/form-elements/InputStates";
import PageMeta from "../../components/common/PageMeta";
import BaseUserGroup from "../../components/form/form-elements/BaseUserGroup";

const initialValues = {
  name: "",
  social_name: "",
  birth_date: "",
  mothers_name: "",
  rg: "",
  cpf: "",
  sus_id_card: "",
  health_insurance: "",
  birth_sex: "",
  email: "",
  phone: "",
  whatsapp_phone: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  social_name: Yup.string(),
  birth_date: Yup.date()
    .required("Data de nascimento é obrigatória")
    .typeError("Data inválida"),
  mothers_name: Yup.string().required("Nome da mãe é obrigatório"),
  rg: Yup.string().required("RG é obrigatório"),
  cpf: Yup.string()
    .required("CPF é obrigatório")
    .matches(/^\d{11}$/, "CPF deve ter 11 dígitos numéricos"),
  sus_id_card: Yup.string().required("Cartão do SUS é obrigatório"),
  health_insurance: Yup.string().required("Plano de saúde é obrigatório"),
  birth_sex: Yup.mixed()
    .oneOf(["Male", "Female"], "Sexo inválido")
    .required("Sexo de nascimento é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
  whatsapp_phone: Yup.string().required("WhatsApp é obrigatório"),
});

export default function DoctorFormRegister() {
  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form values:", values);
  };

  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements Dashboard page for TailAdmin"
      />
      <PageBreadcrumb pageTitle="Form Elements" />

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
                <DefaultInputs />
                <SelectInputs />
                <TextAreaInput />
                <InputStates />
              </div>
              <div className="space-y-6">
                <InputGroup />
                <FileInputExample />
                <CheckboxComponents />
                <RadioButtons />
                <ToggleSwitch />
                <DropzoneComponent />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="rounded bg-primary px-4 py-2 text-white"
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
