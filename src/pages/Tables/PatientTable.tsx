import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/PatientTable";

export default function PatientTables() {
  return (
    <>
      <PageMeta
        title="Listagem de Pacientes"
        description="Pacientes Registrados no sistema"
      />
      <PageBreadcrumb pageTitle="Pacientes" />
      <div className="space-y-6">
          <BasicTableOne />
      </div>
    </>
  );
}
