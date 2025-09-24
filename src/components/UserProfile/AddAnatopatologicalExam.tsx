import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import { Modal } from "../ui/modal"; // ajuste o path
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useCreatePathologyReport } from "../../services/reports/useCreatePathologyReport";

type MarkerResult = "positivo" | "negativo" | "inconclusivo";

interface FormValues {
  procedure: string;
  macroscopy: string;
  microscopy: string;
  diagnosisType: string;
  diagnosisGrade: string;
  ihcMarkers: { markerName: string; result: MarkerResult }[];
  recommendations: { recommendation: string }[];
}

const initialValues: FormValues = {
  procedure: "",
  macroscopy: "",
  microscopy: "",
  diagnosisType: "",
  diagnosisGrade: "",
  ihcMarkers: [{ markerName: "TTF-1", result: "positivo" }],
  recommendations: [{ recommendation: "" }],
};

const validationSchema = Yup.object({
  procedure: Yup.string().required("Procedimento é obrigatório"),
  macroscopy: Yup.string().required("Macroscopia é obrigatória"),
  microscopy: Yup.string().required("Microscopia é obrigatória"),
  diagnosisType: Yup.string().required("Tipo de diagnóstico é obrigatório"),
  diagnosisGrade: Yup.string().required("Grau do diagnóstico é obrigatório"),
  ihcMarkers: Yup.array()
    .of(
      Yup.object({
        markerName: Yup.string().required("Informe o marcador"),
        result: Yup.mixed<MarkerResult>()
          .oneOf(["positivo", "negativo", "inconclusivo"])
          .required("Selecione o resultado"),
      })
    )
    .min(1, "Inclua pelo menos um marcador IHQ"),
  recommendations: Yup.array()
    .of(
      Yup.object({
        recommendation: Yup.string().required("Informe a recomendação"),
      })
    )
    .min(1, "Inclua pelo menos uma recomendação"),
});

interface Props {
  id: string;
  isOpen: boolean;
  closeModal: () => void;
  endpointUrl?: string; // default abaixo
  onSuccess?: (data: any) => void;
  onError?: (e: unknown) => void;
}

export default function PathologyReportModal({
  isOpen,
  closeModal,
  id,
  onSuccess,
  onError,
}: Props) {
  const { mutate: createReport } = useCreatePathologyReport();
  
  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      const data = await createReport({ id, data: values });

      onSuccess?.(data);
      closeModal();
    } catch (e) {
      onError?.(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Registrar Laudo Anatomopatológico
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Preencha os dados do exame para enviar ao prontuário.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="flex flex-col">
              <div className="custom-scrollbar h-[520px] overflow-y-auto px-2 pb-3">
                {/* Informações do Exame */}
                <div className="mt-7">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Informações do Exame
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div className="col-span-2">
                      <Label>Procedimento</Label>
                      <Field
                        as={Input}
                        name="procedure"
                        type="text"
                        placeholder="Biópsia pulmonar por broncoscopia"
                      />
                      {touched.procedure && errors.procedure && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.procedure as string}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Tipo de Diagnóstico</Label>
                      <Field
                        as={Input}
                        name="diagnosisType"
                        type="text"
                        placeholder="Adenocarcinoma pulmonar"
                      />
                      {touched.diagnosisType && errors.diagnosisType && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.diagnosisType as string}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Grau do Diagnóstico</Label>
                      <Field
                        as={Input}
                        name="diagnosisGrade"
                        type="text"
                        placeholder="Moderadamente diferenciado"
                      />
                      {touched.diagnosisGrade && errors.diagnosisGrade && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.diagnosisGrade as string}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <Label>Macroscopia</Label>
                      <Field
                        as="textarea"
                        name="macroscopy"
                        placeholder="Fragmentos de tecido pardo-acastanhado..."
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
                        rows={3}
                      />
                      {touched.macroscopy && errors.macroscopy && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.macroscopy as string}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <Label>Microscopia</Label>
                      <Field
                        as="textarea"
                        name="microscopy"
                        placeholder="Presença de células epiteliais atípicas..."
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
                        rows={3}
                      />
                      {touched.microscopy && errors.microscopy && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.microscopy as string}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Marcadores IHQ
                  </h5>

                  <FieldArray name="ihcMarkers">
                    {({ push, remove }) => (
                      <div className="flex flex-col gap-5">
                        {values.ihcMarkers.map((m, idx) => (
                          <div key={idx} className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-12">
                            <div className="lg:col-span-7">
                              <Label>Marcador</Label>
                              <Field
                                as={Input}
                                name={`ihcMarkers.${idx}.markerName`}
                                type="text"
                                placeholder="TTF-1, p40, Napsina A..."
                              />
                              {errors.ihcMarkers &&
                                touched.ihcMarkers &&
                                (errors.ihcMarkers as any)[idx]?.markerName &&
                                (touched.ihcMarkers as any)[idx]?.markerName && (
                                  <p className="mt-1 text-xs text-red-500">
                                    {(errors.ihcMarkers as any)[idx]?.markerName}
                                  </p>
                                )}
                            </div>

                            <div className="lg:col-span-3">
                              <Label>Resultado</Label>
                              <Field
                                as="select"
                                name={`ihcMarkers.${idx}.result`}
                                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
                              >
                                <option value="positivo">positivo</option>
                                <option value="negativo">negativo</option>
                                <option value="inconclusivo">inconclusivo</option>
                              </Field>
                              {errors.ihcMarkers &&
                                touched.ihcMarkers &&
                                (errors.ihcMarkers as any)[idx]?.result &&
                                (touched.ihcMarkers as any)[idx]?.result && (
                                  <p className="mt-1 text-xs text-red-500">
                                    {(errors.ihcMarkers as any)[idx]?.result}
                                  </p>
                                )}
                            </div>

                            <div className="lg:col-span-2 flex items-end">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => remove(idx)}
                                disabled={values.ihcMarkers.length === 1}
                                className="w-full"
                              >
                                Remover
                              </Button>
                            </div>
                          </div>
                        ))}

                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => push({ markerName: "", result: "positivo" })}
                          >
                            Adicionar marcador
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Recomendações */}
                <div className="mt-10">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Recomendações
                  </h5>

                  <FieldArray name="recommendations">
                    {({ push, remove }) => (
                      <div className="flex flex-col gap-5">
                        {values.recommendations.map((r, idx) => (
                          <div key={idx} className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-12">
                            <div className="lg:col-span-10">
                              <Label>Recomendação</Label>
                              <Field
                                as={Input}
                                name={`recommendations.${idx}.recommendation`}
                                type="text"
                                placeholder="Solicitar PET-CT; Avaliar mutações EGFR/ALK..."
                              />
                              {errors.recommendations &&
                                touched.recommendations &&
                                (errors.recommendations as any)[idx]?.recommendation &&
                                (touched.recommendations as any)[idx]?.recommendation && (
                                  <p className="mt-1 text-xs text-red-500">
                                    {(errors.recommendations as any)[idx]?.recommendation}
                                  </p>
                                )}
                            </div>

                            <div className="lg:col-span-2 flex items-end">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => remove(idx)}
                                disabled={values.recommendations.length === 1}
                                className="w-full"
                              >
                                Remover
                              </Button>
                            </div>
                          </div>
                        ))}

                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => push({ recommendation: "" })}
                          >
                            Adicionar recomendação
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Fechar
                </Button>
                <Button size="sm" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Salvar"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
