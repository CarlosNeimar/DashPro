import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select';
import { useModuleClasses, useModules } from '../renderAPI/hooks/useStore';
import { Alertreturn } from './Alertreturn';

interface ModuleClass {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string | undefined;
}

interface ModuleData {
  name: string;
  path: string;
  class: ModuleClass;
  status: string;
  isFavorite: boolean;
  description?: string;
}

interface NewmoduleformsProps {
  moduleData: ModuleData;
  setModuleData: React.Dispatch<React.SetStateAction<ModuleData>>;
}

export const Newmoduleforms = ({ moduleData, setModuleData }: NewmoduleformsProps) => {
  const { moduleClasses } = useModuleClasses();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [filePath, setFilePath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addModule, deleteModule } = useModules();
  const [ moduleIdToDelete, setModuleToDelete] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const path = file.webkitRelativePath || URL.createObjectURL(file);
      setFilePath(path);
      handleChange('path', path);
    }
  };

  const handleClearSelection = () => {
    setFilePath(null);
    handleChange('path', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(moduleData);
  };

  const handleChange = (field: keyof ModuleData, value: string | boolean | ModuleClass) => {
    setModuleData(prev => ({ ...prev, [field]: value }));
  };

  const idgenerator = crypto.randomUUID();

  const handleDeleteModule = () => {
    if (moduleIdToDelete) {
      deleteModule(moduleIdToDelete);
    }
  }

  const handleAddModule = () => {
    try {
      addModule({
        id: idgenerator,
        name: moduleData.name,
        path: moduleData.path,
        class: moduleData.class,
        status: 'add',
        isFavorite: false,
        description: moduleData.description
      });
      setModuleToDelete(idgenerator);
      setAlertStatus("success");
      setAlertMessage(`O novo modulo "${moduleData.name}" foi criada com sucesso.`);
      setIsAlertOpen(true);
    } catch (error) {
      setAlertStatus("error");
      setAlertMessage("Erro ao criar o módulo. Tente novamente.");
      setIsAlertOpen(true);
    }
  };

  const redirect = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <h3 className="mt-5 ml-5 scroll-m-20 text-2xl font-semibold tracking-tight">
        Novo Módulo
      </h3>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <div className="mb-3">
              <Label htmlFor="name">Nome do Módulo</Label>
            </div>
            <Input
              id="name"
              type="text"
              value={moduleData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <div className="mb-3">
              <Label htmlFor="fileInput">Caminho</Label>
            </div>

            <div className="flex gap-2">
              {filePath ? (
                <>
                  <Input
                    value={filePath}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    onClick={handleClearSelection}
                    variant="outline"
                  >
                    Limpar
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => document.getElementById('fileInput')?.click()}
                  className="w-max"
                >
                  Selecionar Arquivo
                </Button>
              )}
            </div>

            <Input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <div>
            <div className="mb-3">
              <Label htmlFor="class">Classe</Label>
            </div>
            <Select
              value={moduleData.class.id}
              onValueChange={(value) => {
                const selectedClass = moduleClasses.find(cls => cls.id === value);
                if (selectedClass) {
                  handleChange('class', selectedClass);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione uma classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Classes</SelectLabel>
                  {moduleClasses.map((cls, index) => (
                    <SelectItem key={index} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mb-3">
              <Label htmlFor="description">Descrição</Label>
            </div>
            <Textarea
              id="description"
              value={moduleData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full" onClick={handleAddModule}>
            Criar Módulo
          </Button>
        </div>
      </form>

      <Alertreturn
        Title={alertStatus === "success" ? "Sucesso!" : "Erro!"}
        description={alertMessage}
        status={alertStatus}
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onDelete={handleDeleteModule}
        redirect={true}
        onRedirect={redirect}
      />
    </div>
  );
};

export default Newmoduleforms;