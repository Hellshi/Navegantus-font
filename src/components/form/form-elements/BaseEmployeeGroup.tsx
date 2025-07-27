import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { useState } from "react";
import { useMask } from '@react-input/mask';


export default function BaseEmployeeGroup() {

  const crmInputRef = useMask({
    mask: '________-_',
    replacement: { _: /\d/ },
  })

  const corenInputRef = useMask({
    mask: '________-_',
    replacement: { _: /\d/ },
  })
  
  const [, setSelectedSex] = useState<string>("");

  const roleOptions = [
    { value: "HEALTH_STAFF", label: "Enfermeiro/Médico" },
    { value: "STAFF", label: "Assistente" },
    { value: "NAVIGATOR", label: "Navegante" },
  ];

  const handleSelectChange = (value: string) => {
    setSelectedSex(value);
  };

  return (
    <ComponentCard title="Dados de Funcionário">
      <div className="space-y-6">

        <div>
          <Label htmlFor="cpf">Número de CRM</Label>
          <Input type="text" id="input" ref={crmInputRef} />
        </div>

        <div>
          <Label htmlFor="cpf">Número de Coren</Label>
          <Input type="text" id="input" ref={corenInputRef} />
        </div>
        <div>
          <Label>Cargo</Label>
          <Select
            options={roleOptions}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
      </div>
    </ComponentCard>
  );
}
