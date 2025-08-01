import { Routes, Route } from "react-router";
import { HashRouter } from 'react-router-dom';
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { AnonymousRoute } from "./components/routes/AnonymousRoute";
import DoctorFormRegister from "./pages/RegisterForms/Patient";
import { RoleName } from "./services/interfaces/users";
import PatientFormRegister from "./pages/RegisterForms/Patient";
import PatientTables from "./pages/Tables/PatientTable";
import PatientDetails from "./pages/PatientDetails";

export default function App() {
  return (
    <>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
              <Route element={<AppLayout />}>
              <Route index path="/" element={
                <ProtectedRoute><Home /></ProtectedRoute>
              } />
            
            {/* Others Page */}
            <Route path="/profile" element={<ProtectedRoute><UserProfiles /></ProtectedRoute>} />
            <Route path="/patient" element={<ProtectedRoute><PatientDetails /></ProtectedRoute>} />
            <Route path="/doctor-register" element={<ProtectedRoute /* requiredPermission={RoleName.COORDINATOR} */><DoctorFormRegister /></ProtectedRoute>} />
            <Route path="/patient-register" element={<ProtectedRoute /* requiredPermission={RoleName.COORDINATOR} */><PatientFormRegister /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/patient-tables" element={<PatientTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
          
            <Route path="/signin" element={<AnonymousRoute><SignIn /></AnonymousRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}
