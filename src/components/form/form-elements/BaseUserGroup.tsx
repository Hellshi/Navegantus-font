import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";
import Select from "../Select";
import DatePicker from "../date-picker";
import { useMask } from "@react-input/mask";
import { useFormikContext } from "formik";

export default function BaseUserGroup() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<any>();

  const cpfInputRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const rgInputRef = useMask({
    mask: "_______-_",
    replacement: { _: /\d/ },
  });

  const countries = [{ code: "BR", label: "+55" }];

  const birthSexOptions = [
    { value: "Masculino", label: "Masculino" },
    { value: "Feminino", label: "Feminino" },
  ];

  return (
    <ComponentCard title="Dados Básicos">
      <div className="space-y-6">

        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className={touched.name && errors.name ? "border-red-500" : ""}
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-sm">{errors.name as string}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="name">Nome Social</Label>
          <Input
            type="text"
            name="social_name"
            value={values.social_name}
            onChange={handleChange}
            className={touched.social_name && errors.social_name ? "border-red-500" : ""}
          />
          {touched.social_name && errors.social_name && (
            <p className="text-red-500 text-sm">{errors.social_name as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="info@gmail.com"
              type="text"
              className={`pl-[62px] ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
          {touched.email && errors.email && (
            <p className="text-red-500 text-sm">{errors.email as string}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <div>
          <Label>Sexo</Label>
          <Select
            options={birthSexOptions}
            placeholder="Selecione"
            onChange={(value) => setFieldValue("birthSex", value)}
            defaultValue={birthSexOptions.find((o) => o.value === values.birthSex) as string}
            className="dark:bg-dark-900"
          />
          {touched.birthSex && errors.birthSex && (
            <p className="text-red-500 text-sm">{errors.birthSex as string}</p>
          )}
        </div>

                <div>
          <DatePicker
            id="birth_date"
            label="Data de Nascimento"
            selected={values.birth_date}
            onChange={(_, dateString) => {
              setFieldValue("birth_date", dateString);
            }}
          />
          {touched.birth_date && errors.birth_date && (
            <p className="text-red-500 text-sm">{errors.birth_date as string}</p>
          )}
        </div>
        </div>


        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
          <Label>Telefone</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            value={values.phone}
            onChange={(val) => setFieldValue("phone", val)}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone as string}</p>
          )}
        </div>

        <div>
          <Label>Whatsapp</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            value={values.whatsapp_phone}
            onChange={(val) => setFieldValue("phone", val)}
          />
          {touched.whatsapp_phone && errors.whatsapp_phone && (
            <p className="text-red-500 text-sm">{errors.whatsapp_phone as string}</p>
          )}
        </div>
        </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            type="text"
            name="cpf"
            value={values.cpf}
            onChange={handleChange}
            ref={cpfInputRef}
            className={touched.cpf && errors.cpf ? "border-red-500" : ""}
          />
          {touched.cpf && errors.cpf && (
            <p className="text-red-500 text-sm">{errors.cpf as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="rg">RG</Label>
          <Input
            type="text"
            name="rg"
            value={values.rg}
            onChange={handleChange}
            ref={rgInputRef}
            className={touched.rg && errors.rg ? "border-red-500" : ""}
          />
          {touched.rg && errors.rg && (
            <p className="text-red-500 text-sm">{errors.rg}</p>
          )}
        </div>
          </div>
        
      </div>
    </ComponentCard>
  );
}
