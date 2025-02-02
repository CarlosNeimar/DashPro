// Newclassforms.tsx
import React from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                        <SelectItem key={index} value={icon.name}>
                          {icon.name}
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
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Criar Classe
          </Button>
        </div>
      </form>
    </div>
  );
};