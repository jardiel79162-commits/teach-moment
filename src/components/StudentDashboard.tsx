import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  LogOut, 
  Monitor,
  Wifi,
  WifiOff,
  User
} from "lucide-react";

interface StudentDashboardProps {
  studentName: string;
  studentMatricula: string;
  onLogout: () => void;
}

export const StudentDashboard = ({ studentName, studentMatricula, onLogout }: StudentDashboardProps) => {
  // Simulando status da live - em um app real, isso viria do backend
  const isLiveActive = false; // Mude para true para testar
  const liveType = Math.random() > 0.5 ? "collective" : "private" as const; // Simulação aleatória
  const isStudentAllowed = true; // Para lives particulares

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Painel do Aluno</h1>
              <p className="text-muted-foreground">Bem-vindo, {studentName}</p>
              <p className="text-sm text-muted-foreground">Matrícula: {studentMatricula}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Status da Conexão */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Status da Transmissão
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLiveActive ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-red-600">PROFESSOR AO VIVO</span>
                    </div>
                    <Badge variant={liveType === "collective" ? "default" : "secondary"}>
                      {liveType === "collective" ? "Live Coletiva" : "Live Particular"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Wifi className="w-4 h-4" />
                    <span className="text-sm">Conectado</span>
                  </div>
                </div>
                
                {liveType === "private" && !isStudentAllowed && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                      ⚠️ Esta é uma live particular e você não foi selecionado para participar.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <VideoOff className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Professor não está em live</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm">Aguardando</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Área de Vídeo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Transmissão
            </CardTitle>
            <CardDescription>
              {isLiveActive && (liveType === "collective" || isStudentAllowed)
                ? "Assistindo à transmissão do professor"
                : "Aguardando o professor iniciar a transmissão"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
              {isLiveActive && (liveType === "collective" || isStudentAllowed) ? (
                <>
                  {/* Área de vídeo simulada */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <div className="relative z-10 text-center text-white">
                    <Video className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium">Transmissão do Professor</p>
                    <p className="text-sm opacity-80">Vídeo e áudio em tempo real</p>
                    
                    {/* Indicador de AO VIVO */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">AO VIVO</span>
                    </div>
                    
                    {/* Controles simulados */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center gap-4 bg-black/50 px-4 py-2 rounded-full">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Conectado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-white/80">
                  <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Aguardando Transmissão</p>
                  <p className="text-sm opacity-70">
                    {isLiveActive && liveType === "private" && !isStudentAllowed
                      ? "Você não foi selecionado para esta live particular"
                      : "O professor iniciará a transmissão em breve"
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sua Sessão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nome:</span>
                  <span>{studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Matrícula:</span>
                  <span>{studentMatricula}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={isLiveActive ? "default" : "secondary"} className="text-xs">
                    {isLiveActive ? "Em aula" : "Aguardando"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Instruções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Aguarde o professor iniciar a transmissão</p>
                <p>• Mantenha esta página aberta</p>
                <p>• A transmissão iniciará automaticamente</p>
                <p>• Em caso de problemas, faça login novamente</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};