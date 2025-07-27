import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { useFormikContext } from "formik";

export default function BaseMedicalNumsGroup() {
  const {
    values,
    handleChange,
    errors,
    touched,
  } = useFormikContext<any>();

  return (
    <ComponentCard title="Dados de Saúde">
      <div className="space-y-6">

        <div>
          <Label htmlFor="sus_id_card">Número do Cartão do SUS</Label>
          <Input
            type="text"
            id="sus_id_card"
            name="sus_id_card"
            value={values.sus_id_card}
            onChange={handleChange}
            className={touched.sus_id_card && errors.sus_id_card ? "border-red-500" : ""}
          />
          {touched.sus_id_card && errors.sus_id_card && (
            <p className="text-red-500 text-sm">{errors.sus_id_card as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="health_insurance">Número do Plano de Saúde</Label>
          <Input
            type="text"
            id="health_insurance"
            name="health_insurance"
            value={values.health_insurance}
            onChange={handleChange}
            className={touched.health_insurance && errors.health_insurance ? "border-red-500" : ""}
          />
          {touched.health_insurance && errors.health_insurance && (
            <p className="text-red-500 text-sm">{errors.health_insurance as string}</p>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}