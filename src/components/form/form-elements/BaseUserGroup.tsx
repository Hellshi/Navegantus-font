import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";
import Select from "../Select";
import { useState } from "react";
import DatePicker from "../date-picker";
import { useMask } from '@react-input/mask';


export default function BaseUserGroup() {
const cpfInputRef = useMask({
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  });

  const rgInputRef = useMask({
    mask: '_______-_',
    replacement: { _: /\d/ },
  })


  const [, setSelectedSex] = useState<string>("");

  const countries = [{ code: "BR", label: "+55" }];

  const birthSexOptions = [
    { value: "male", label: "Masculino" },
    { value: "female", label: "Feminino" },
  ];

  const handleSelectChange = (value: string) => {
    setSelectedSex(value);
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };

  return (
    <ComponentCard title="Dados Básicos">
      <div className="space-y-6">

        <div>
          <Label htmlFor="cpf">Nome Completo</Label>
          <Input type="text" id="input" ref={rgInputRef} />
        </div>

        <div>
          <DatePicker
            id="date-picker"
            label="Data de Nascimento"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              placeholder="info@gmail.com"
              type="text"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>

        <div>
          <Label>Sexo</Label>
          <Select
            options={birthSexOptions}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <Label>Telefone</Label>
          <PhoneInput
            selectPosition="end"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>

        <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input type="text" id="input" ref={cpfInputRef} />
        </div>
        <div>
          <Label htmlFor="cpf">RG</Label>
          <Input type="text" id="input" ref={rgInputRef} />
        </div>
      </div>
    </ComponentCard>
  );
}
