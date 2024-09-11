import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translations } from '../utils/translations';

const formSchema = z.object({
  age: z.number().min(1).max(120),
  gender: z.enum(['male', 'female']),
  weight: z.number().positive(),
  height: z.number().positive(),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'veryActive']),
  waist: z.number().positive(),
  hip: z.number().positive(),
  neck: z.number().positive(),
});

const InputForm = ({ onCalculate, language }) => {
  const t = translations[language];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: '',
      gender: 'male',
      weight: '',
      height: '',
      activityLevel: 'moderate',
      waist: '',
      hip: '',
      neck: '',
    },
  });

  const onSubmit = (data) => {
    onCalculate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.age}</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add other form fields here, similar to the age field above */}
        <Button type="submit">{t.calculateButton}</Button>
      </form>
    </Form>
  );
};

export default InputForm;