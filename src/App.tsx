import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import VolunteeringFeed from "./pages/VolunteeringFeed";
import AcceptedVolunteering from "./pages/AcceptedVolunteering";
import CreateVolunteering from "./pages/CreateVolunteering";
import StudentProfile from "./pages/StudentProfile";
import ActivityDetails from "./pages/ActivityDetails";
import CertificateWallet from "./pages/CertificateWallet";
import ActivitiesFeed from "./pages/ActivitiesFeed";
import StudentSettings from "./pages/StudentSettings";
import FacultyCreateActivity from "./pages/FacultyCreateActivity";
import FacultyVerify from "./pages/FacultyVerify";
import FacultyAnalytics from "./pages/FacultyAnalytics";
import FacultyProfile from "./pages/FacultyProfile";
import AdminUsers from "./pages/AdminUsers";
import AdminActivities from "./pages/AdminActivities";
import AdminBlockchain from "./pages/AdminBlockchain";
import AdminSettings from "./pages/AdminSettings";
import StudentRecommendations from "./pages/StudentRecommendations";
import FacultyManage from "./pages/FacultyManage";
import FacultyManageDetail from "./pages/FacultyManageDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/activities" element={<ActivitiesFeed />} />
          <Route path="/student/volunteering" element={<VolunteeringFeed />} />
          <Route path="/student/volunteering/accepted" element={<AcceptedVolunteering />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/activity/:id" element={<ActivityDetails />} />
          <Route path="/student/certificates" element={<CertificateWallet />} />
          <Route path="/student/recommendations" element={<StudentRecommendations />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/manage" element={<FacultyManage />} />
          <Route path="/faculty/manage/:type/:id" element={<FacultyManageDetail />} />
          <Route path="/faculty/create" element={<FacultyCreateActivity />} />
          <Route path="/faculty/volunteering/create" element={<CreateVolunteering />} />
          <Route path="/faculty/verify" element={<FacultyVerify />} />
          <Route path="/faculty/analytics" element={<FacultyAnalytics />} />
          <Route path="/faculty/profile" element={<FacultyProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/activities" element={<AdminActivities />} />
          <Route path="/admin/blockchain" element={<AdminBlockchain />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
