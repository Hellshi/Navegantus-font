import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { useMask } from "@react-input/mask";

export default function DefaultAddress() {
  const cepInputRef = useMask({
      mask: '_____-___',
      replacement: { _: /\d/ },
    });
  const stateOptions = [
  { value: "AC", label: "AC" },
  { value: "AL", label: "AL" },
  { value: "AP", label: "AP" },
  { value: "AM", label: "AM" },
  { value: "BA", label: "BA" },
  { value: "CE", label: "CE" },
  { value: "DF", label: "DF" },
  { value: "ES", label: "ES" },
  { value: "GO", label: "GO" },
  { value: "MA", label: "MA" },
  { value: "MT", label: "MT" },
  { value: "MS", label: "MS" },
  { value: "MG", label: "MG" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PR", label: "PR" },
  { value: "PE", label: "PE" },
  { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" },
  { value: "RN", label: "RN" },
  { value: "RS", label: "RS" },
  { value: "RO", label: "RO" },
  { value: "RR", label: "RR" },
  { value: "SC", label: "SC" },
  { value: "SP", label: "SP" },
  { value: "SE", label: "SE" },
  { value: "TO", label: "TO" },
];

  const [, setSelectedState] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedState(value);
  };

  return (
    <ComponentCard title="Endereço">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
            <Label htmlFor="input">CEP</Label>
            <Input type="text" id="input" ref={cepInputRef} />
          </div>
          <div>
          <Label>Estado</Label>
          <Select
            options={stateOptions}
            placeholder="Select Option"
            defaultValue="AL"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        </div>
        <div>
            <Label htmlFor="input">Cidade</Label>
            <Input type="text" id="input" />
        </div>
        <div>
            <Label htmlFor="input">Endereço</Label>
            <Input type="text" id="input" />
        </div>
        <div>
            <Label htmlFor="input">Bairro</Label>
            <Input type="text" id="input" />
        </div>
      </div>
    </ComponentCard>
  );
}
