import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { useMask } from "@react-input/mask";
import { useFormikContext } from "formik";

export default function DefaultAddress() {
  const {
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<any>();

  const cepInputRef = useMask({
    mask: "_____-___",
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
    setFieldValue("state", value);
  };

  return (
    <ComponentCard title="Endereço">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
            <Label htmlFor="cep">CEP</Label>
            <Input type="text" name="cep" id="cep" ref={cepInputRef} />
            {touched.cep && errors.cep && (
              <p className="text-red-500 text-sm">{errors.cep as string}</p>
            )}
          </div>

          <div>
            <Label htmlFor="state">Estado</Label>
            <Select
              options={stateOptions}
              placeholder="Selecione o estado"
              onChange={(value) => handleSelectChange(value)}
              className="dark:bg-dark-900"
            />
            {touched.state && errors.state && (
              <p className="text-red-500 text-sm">{errors.state as string}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input type="text" name="city" id="city" />
          {touched.city && errors.city && (
            <p className="text-red-500 text-sm">{errors.city as string}</p>
          )}
        </div>
        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input type="text" name="neighborhood" id="neighborhood" />
          {touched.neighborhood && errors.neighborhood && (
            <p className="text-red-500 text-sm">{errors.neighborhood as string}</p>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}
