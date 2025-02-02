import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useIcons } from '@/ui/renderAPI/hooks/useStore';
import { useModuleClasses } from '../renderAPI/hooks/useStore';
import { Alertreturn } from './Alertreturn';
import LordIcon from "../lordicons/Lordi";

interface FormData {
  className: string;
  color: string;
  icon: string;
  description: string;
}

interface NewclassformsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const Newclassforms = ({ formData, setFormData }: NewclassformsProps) => {
  const { icons, isLoading } = useIcons();
  const { addModuleClass, deleteModuleClass } = useModuleClasses();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [classIdToDelete, setClassIdToDelete] = useState<string | null>(null);
  const [loadedIcons, setLoadedIcons] = useState<Record<string, any>>({});

  // Load icons when the `icons` array changes
  useEffect(() => {
    const loadIcons = async () => {
      const iconData: Record<string, any> = {};
      for (const icon of icons) {
        const data = await importIcon(icon.name);
        if (data) {
          iconData[icon.name] = data;
        }
      }
      setLoadedIcons(iconData);
    };

    if (!isLoading && icons.length > 0) {
      loadIcons();
    }
  }, [icons, isLoading]);

  const importIcon = async (iconName: string) => {
    try {
      const icon = await import(`@/ui/assets/icons/modulesicons/${iconName}.json`);
      return icon.default;
    } catch (error) {
      console.error(`Error loading icon ${iconName}:`, error);
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const idgenerator = crypto.randomUUID();

  const handleAddClass = () => {
    try {
      addModuleClass({
        id: idgenerator,
        name: formData.className,
        icon: formData.icon,
        color: formData.color,
        description: formData.description,
      });
      setClassIdToDelete(idgenerator);
      setAlertStatus("success");
      setAlertMessage(`A nova classe "${formData.className}" foi criada com sucesso com o id. Agora adicione módulos à classe.`);
      setIsAlertOpen(true);
    } catch (error) {
      setAlertStatus("error");
      setAlertMessage("Erro ao criar a classe. Tente novamente.");
      setIsAlertOpen(true);
    }
  };

  const handleDeleteClass = () => {
    if (classIdToDelete) {
      deleteClass(classIdToDelete);
    }
  };

  const deleteClass = (id: string) => {
    try {
      deleteModuleClass(id);
      setAlertStatus("success");
      setAlertMessage("Classe deletada com sucesso!");
      setIsAlertOpen(true);
    } catch (error) {
      setAlertStatus("error");
      setAlertMessage("Erro ao deletar a classe. Tente novamente.");
      setIsAlertOpen(true);
    }
  };

  const redirect = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <h3 className="mt-5 ml-5 scroll-m-20 text-2xl font-semibold tracking-tight">
        Nova classe
      </h3>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="className">Nome da Classe</Label>
            <Input
              id="className"
              type="text"
              value={formData.className}
              onChange={(e) => handleChange('className', e.target.value)}
              required
            />
          </div>

          <div className="flex">
            <div className='mr-5 items-center flex'>
              <Label className='mr-3' htmlFor="color">Cor</Label>
              <Input
                className='w-15'
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => handleChange('color', e.target.value)}
                required
              />
            </div>

            <div className='mr-5 items-center flex'>
              <Label className='mr-3' htmlFor="icon">Ícone</Label>
              <Select value={formData.icon} onValueChange={(value) => handleChange('icon', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione um ícone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ícones</SelectLabel>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>
                        Carregando...
                      </SelectItem>
                    ) : (
                      icons.map((icon, index) => (
                        <SelectItem key={index} value={icon.name} className="flex items-center gap-x-2">
                          <div className="">

                          {loadedIcons[icon.name] ? (
                            <LordIcon
                            icon={loadedIcons[icon.name]}
                              size={24} // Ajuste o tamanho do ícone conforme necessário
                              colors="primary:blue"
                              />
                            ) : (
                              <span>Ícone inválido</span>
                            )}
                          <span>{icon.name}</span>
                            </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full" onClick={handleAddClass}>
            Criar Classe
          </Button>
        </div>
      </form>

      <Alertreturn
        Title={alertStatus === "success" ? "Sucesso!" : "Erro!"}
        description={alertMessage}
        status={alertStatus}
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        destruct={classIdToDelete ? "Apagar" : undefined}
        redirect={true}
        onDelete={handleDeleteClass}
        onRedirect={redirect}
      />
    </div>
  );
};