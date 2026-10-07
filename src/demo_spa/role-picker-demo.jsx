import { useEffect, useState } from "react";
import StudentAccountDemo from "./lost-and-found.jsx";
import AdminAccountDemo from "./admin-account-demo.jsx";
import StaffAccountDemo from "./staff-account-demo.jsx";
import DemoLoading from "./demo-loading.jsx";

const roleOptions = [
  { value: "student", label: "Student Account", description: "Browse the current lost-and-found experience as a student would." },
  { value: "admin", label: "Admin Account", description: "Modify item records and archive items." },
  { value: "staff", label: "Staff Account", description: "Upload new lost items and mark them as found." },
];

function RolePickerDemo() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitialLoading) return;

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => window.clearTimeout(timer);
  }, [isInitialLoading]);

  const handleRoleSelect = (role) => {
    setIsVisible(false);
    window.setTimeout(() => {
      setSelectedRole(role);
      setIsVisible(true);
    }, 250);
  };

  const handleBack = () => {
    setIsVisible(false);
    setSelectedRole(null);
    window.setTimeout(() => {
      setIsVisible(true);
    }, 10);
  };

  if (isInitialLoading) {
    return <DemoLoading message="Preparing the experience..." />;
  }

  if (selectedRole === "admin") {
    return <AdminAccountDemo onBack={handleBack} />;
  }

  if (selectedRole === "staff") {
    return <StaffAccountDemo onBack={handleBack} />;
  }

  if (selectedRole === "student") {
    return <StudentAccountDemo onBack={handleBack} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className={`w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-black/30 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Lost & Found WebApp Demo</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Choose the account you want to experience</h1>
        <p className="mt-3 text-slate-400">Each role explores a different version of the demo, while the student path keeps the existing flow intact.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {roleOptions.map((option) => (
            <button key={option.value} type="button" onClick={() => handleRoleSelect(option.value)} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-left transition hover:border-amber-400 hover:bg-slate-900">
              <p className="text-lg font-semibold text-white">{option.label}</p>
              <p className="mt-2 text-sm text-slate-400">{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RolePickerDemo;
