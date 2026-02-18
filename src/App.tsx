import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/activities" element={<ActivitiesFeed />} />
          <Route path="/student/volunteering" element={<VolunteeringFeed />} />
          <Route path="/student/volunteering/accepted" element={<AcceptedVolunteering />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/activity/:id" element={<ActivityDetails />} />
          <Route path="/student/certificates" element={<CertificateWallet />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/volunteering/create" element={<CreateVolunteering />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
