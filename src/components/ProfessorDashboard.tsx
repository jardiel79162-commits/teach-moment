import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Video, 
  VideoOff, 
  UserPlus, 
  Users, 
  LogOut, 
  Play, 
  Square,
  UserCheck,
  Monitor
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  matricula: string;
}

interface ProfessorDashboardProps {
  onLogout: () => void;
}

export const ProfessorDashboard = ({ onLogout }: ProfessorDashboardProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentMatricula, setNewStudentMatricula] = useState("");
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveType, setLiveType] = useState<"collective" | "private" | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [privateStudentCount, setPrivateStudentCount] = useState("");
  const [showStudentSelection, setShowStudentSelection] = useState(false);
  const { toast } = useToast();

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim() && newStudentMatricula.trim()) {
      const newStudent: Student = {
        id: Date.now().toString(),
        name: newStudentName.trim(),
        matricula: newStudentMatricula.trim()
      };
      setStudents([...students, newStudent]);
      setNewStudentName("");
      setNewStudentMatricula("");
      toast({
        title: "Aluno cadastrado",
        description: `${newStudent.name} foi adicionado com sucesso.`,
      });
    }
  };

  const startCollectiveLive = () => {
    setIsLiveActive(true);
    setLiveType("collective");
    toast({
      title: "Live Coletiva Iniciada",
      description: "Todos os alunos podem assistir agora.",
    });
  };

  const startPrivateLive = () => {
    const count = parseInt(privateStudentCount);
    if (count > 0 && count <= students.length) {
      setShowStudentSelection(true);
    } else {
      toast({
        title: "Erro",
        description: "Número de alunos inválido.",
        variant: "destructive",
      });
    }
  };

  const confirmPrivateLive = () => {
    if (selectedStudents.length > 0) {
      setIsLiveActive(true);
      setLiveType("private");
      setShowStudentSelection(false);
      toast({
        title: "Live Particular Iniciada",
        description: `${selectedStudents.length} aluno(s) selecionado(s).`,
      });
    }
  };

  const endLive = () => {
    setIsLiveActive(false);
    setLiveType(null);
    setSelectedStudents([]);
    setPrivateStudentCount("");
    setShowStudentSelection(false);
    toast({
      title: "Live Encerrada",
      description: "A transmissão foi finalizada.",
    });
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Painel do Professor</h1>
              <p className="text-muted-foreground">Bem-vindo, JARDIEL</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Live Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Status da Transmissão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isLiveActive ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">AO VIVO</span>
                    </div>
                    <Badge variant={liveType === "collective" ? "default" : "secondary"}>
                      {liveType === "collective" ? "Live Coletiva" : `Live Particular (${selectedStudents.length} alunos)`}
                    </Badge>
                  </>
                ) : (
                  <>
                    <VideoOff className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Transmissão offline</span>
                  </>
                )}
              </div>
              {isLiveActive && (
                <Button variant="destructive" onClick={endLive} className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Encerrar Live
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cadastrar Aluno */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Cadastrar Aluno
              </CardTitle>
              <CardDescription>
                Adicione novos alunos ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addStudent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Nome Completo</Label>
                  <Input
                    id="studentName"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Digite o nome do aluno"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentMatricula">Matrícula</Label>
                  <Input
                    id="studentMatricula"
                    value={newStudentMatricula}
                    onChange={(e) => setNewStudentMatricula(e.target.value)}
                    placeholder="Digite a matrícula"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Cadastrar Aluno
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Controles de Live */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Controles de Transmissão
              </CardTitle>
              <CardDescription>
                Inicie lives coletivas ou particulares
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isLiveActive ? (
                <>
                  <Button 
                    onClick={startCollectiveLive} 
                    className="w-full flex items-center gap-2"
                    disabled={students.length === 0}
                  >
                    <Play className="w-4 h-4" />
                    Iniciar Live Coletiva
                  </Button>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label htmlFor="privateCount">Live Particular</Label>
                    <div className="flex gap-2">
                      <Input
                        id="privateCount"
                        type="number"
                        min="1"
                        max={students.length}
                        value={privateStudentCount}
                        onChange={(e) => setPrivateStudentCount(e.target.value)}
                        placeholder="Quantos alunos?"
                        className="flex-1"
                      />
                      <Button 
                        onClick={startPrivateLive}
                        disabled={!privateStudentCount || students.length === 0}
                        variant="secondary"
                      >
                        Selecionar
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <Video className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="font-medium">Transmissão em andamento</p>
                  <p className="text-sm text-muted-foreground">
                    {liveType === "collective" 
                      ? `${students.length} alunos podem assistir`
                      : `${selectedStudents.length} alunos selecionados`
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Lista de Alunos */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Alunos Cadastrados ({students.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum aluno cadastrado ainda</p>
                <p className="text-sm">Adicione alunos para começar</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student) => (
                  <div 
                    key={student.id} 
                    className={`p-4 border rounded-lg transition-colors ${
                      showStudentSelection 
                        ? selectedStudents.includes(student.id)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 cursor-pointer"
                        : "border-border"
                    }`}
                    onClick={showStudentSelection ? () => toggleStudentSelection(student.id) : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">Mat: {student.matricula}</p>
                      </div>
                      {showStudentSelection && selectedStudents.includes(student.id) && (
                        <UserCheck className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seleção de Alunos para Live Particular */}
        {showStudentSelection && (
          <Card className="mt-6 border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Selecionar Alunos para Live Particular</CardTitle>
              <CardDescription>
                Escolha {privateStudentCount} aluno(s) para participar da live
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {selectedStudents.length} de {privateStudentCount} selecionado(s)
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowStudentSelection(false);
                      setSelectedStudents([]);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={confirmPrivateLive}
                    disabled={selectedStudents.length !== parseInt(privateStudentCount)}
                  >
                    Iniciar Live Particular
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};