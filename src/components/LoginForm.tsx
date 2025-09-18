import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Video } from "lucide-react";

interface LoginFormProps {
  onProfessorLogin: () => void;
  onStudentLogin: (name: string, matricula: string) => void;
}

export const LoginForm = ({ onProfessorLogin, onStudentLogin }: LoginFormProps) => {
  const [professorUser, setProfessorUser] = useState("");
  const [professorPassword, setProfessorPassword] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentMatricula, setStudentMatricula] = useState("");
  const [error, setError] = useState("");

  const handleProfessorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (professorUser === "JARDIEL" && professorPassword === "654321") {
      onProfessorLogin();
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim() && studentMatricula.trim()) {
      onStudentLogin(studentName, studentMatricula);
    } else {
      setError("Preencha todos os campos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4 shadow-elegant">
            <Video className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            JTC Ensino Live
          </h1>
          <p className="text-muted-foreground mt-2">
            Plataforma de transmissão ao vivo educacional
          </p>
        </div>

        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              Acesso ao Sistema
            </CardTitle>
            <CardDescription>
              Faça login como professor ou aluno
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Aluno
                </TabsTrigger>
                <TabsTrigger value="professor" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Professor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Nome Completo</Label>
                    <Input
                      id="studentName"
                      type="text"
                      placeholder="Digite seu nome completo"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentMatricula">Matrícula</Label>
                    <Input
                      id="studentMatricula"
                      type="text"
                      placeholder="Digite sua matrícula"
                      value={studentMatricula}
                      onChange={(e) => setStudentMatricula(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button type="submit" className="w-full h-11" size="lg">
                    Entrar como Aluno
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="professor">
                <form onSubmit={handleProfessorLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="professorUser">Usuário</Label>
                    <Input
                      id="professorUser"
                      type="text"
                      placeholder="Digite seu usuário"
                      value={professorUser}
                      onChange={(e) => setProfessorUser(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professorPassword">Senha</Label>
                    <Input
                      id="professorPassword"
                      type="password"
                      placeholder="Digite sua senha"
                      value={professorPassword}
                      onChange={(e) => setProfessorPassword(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button type="submit" variant="secondary" className="w-full h-11" size="lg">
                    Entrar como Professor
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          © 2024 JTC Ensino Live - Todos os direitos reservados
        </div>
      </div>
    </div>
  );
};