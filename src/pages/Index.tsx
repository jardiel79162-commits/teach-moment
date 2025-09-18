import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { ProfessorDashboard } from "@/components/ProfessorDashboard";
import { StudentDashboard } from "@/components/StudentDashboard";

type UserType = "none" | "professor" | "student";

interface StudentData {
  name: string;
  matricula: string;
}

const Index = () => {
  const [userType, setUserType] = useState<UserType>("none");
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleProfessorLogin = () => {
    setUserType("professor");
  };

  const handleStudentLogin = (name: string, matricula: string) => {
    setStudentData({ name, matricula });
    setUserType("student");
  };

  const handleLogout = () => {
    setUserType("none");
    setStudentData(null);
  };

  if (userType === "professor") {
    return <ProfessorDashboard onLogout={handleLogout} />;
  }

  if (userType === "student" && studentData) {
    return (
      <StudentDashboard
        studentName={studentData.name}
        studentMatricula={studentData.matricula}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <LoginForm
      onProfessorLogin={handleProfessorLogin}
      onStudentLogin={handleStudentLogin}
    />
  );
};

export default Index;