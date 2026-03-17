import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/auth/login";
import RegisterStep1 from "@/pages/auth/register-step-1";
import RegisterStep2 from "@/pages/auth/register-step-2";
import Recovery from "@/pages/auth/recovery";
import Home from "@/pages/Home";
import FreightsList from "@/pages/freights/list";
import FreightExpenses from "@/pages/freights/expenses";
import NewExpense from "@/pages/freights/new-expense";
import Transfer from "@/pages/financial/transfer";
import Profile from "@/pages/profile";
import EditContact from "@/pages/profile/edit-contact";
import EditEmail from "@/pages/profile/edit-email";
import EditPhoto from "@/pages/profile/edit-photo";
import EditBank from "@/pages/profile/edit-bank";
import ProfileVehicle from "@/pages/profile/vehicle";
import Terms from "@/pages/terms";
import Help from "@/pages/help";
import Settings from "@/pages/settings";
import Extract from "@/pages/financial/extract";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register/step-1" component={RegisterStep1} />
      <Route path="/register/step-2" component={RegisterStep2} />
      <Route path="/recovery" component={Recovery} />
      <Route path="/home" component={Home} />
      <Route path="/transfer" component={Transfer} />
      <Route path="/extract" component={Extract} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile/edit-contact" component={EditContact} />
      <Route path="/profile/edit-email" component={EditEmail} />
      <Route path="/profile/edit-photo" component={EditPhoto} />
      <Route path="/profile/edit-bank" component={EditBank} />
      <Route path="/profile/edit-vehicle" component={ProfileVehicle} />
      <Route path="/terms" component={Terms} />
      <Route path="/help" component={Help} />
      <Route path="/settings" component={Settings} />
      <Route path="/freights" component={FreightsList} />
      <Route path="/freights/:id/expenses" component={FreightExpenses} />
      <Route path="/freights/:id/expenses/new" component={NewExpense} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
