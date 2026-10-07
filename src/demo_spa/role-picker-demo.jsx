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
    <main className={`brutal-page transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <section className="brutal-panel">
        <div className="brutal-topline">
          <span className="brutal-topline-mark">Lost & Found / Demo 001</span>
          <span>Interactive prototype</span>
        </div>
        <div className="brutal-content">
          <p className="brutal-kicker">Lost & Found WebApp</p>
          <h1 className="brutal-title">Pick your point of view.</h1>
          <p className="brutal-copy">Three roles. One lost-property desk. Choose an account to step into the demo.</p>
          <div className="brutal-role-grid">
            {roleOptions.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleRoleSelect(option.value)}
                className="brutal-role-card"
              >
                <span className="brutal-role-index">0{index + 1}</span>
                <span className="brutal-role-name">{option.label}</span>
                <span className="brutal-role-description">{option.description}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default RolePickerDemo;
