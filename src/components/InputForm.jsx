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
  benchPress: z.number().positive().optional(),
  targetHeartRate: z.number().positive().optional(),
});

const InputField = ({ name, label, type = "number", control, t }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} {...field} onChange={(e) => field.onChange(type === "number" ? parseFloat(e.target.value) : e.target.value)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const SelectField = ({ name, label, options, control, t }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={t[`select${name.charAt(0).toUpperCase() + name.slice(1)}`]} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option} value={option}>{t[option]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

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
      benchPress: '',
      targetHeartRate: '',
    },
  });

  const onSubmit = (data) => {
    onCalculate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField name="age" label={t.age} control={form.control} t={t} />
        <SelectField name="gender" label={t.gender} options={['male', 'female']} control={form.control} t={t} />
        <InputField name="weight" label={`${t.weight} (kg)`} control={form.control} t={t} />
        <InputField name="height" label={`${t.height} (cm)`} control={form.control} t={t} />
        <SelectField 
          name="activityLevel" 
          label={t.activityLevel} 
          options={['sedentary', 'light', 'moderate', 'active', 'veryActive']} 
          control={form.control} 
          t={t} 
        />
        <InputField name="waist" label={`${t.waist} (cm)`} control={form.control} t={t} />
        <InputField name="hip" label={`${t.hip} (cm)`} control={form.control} t={t} />
        <InputField name="neck" label={`${t.neck} (cm)`} control={form.control} t={t} />
        <InputField name="benchPress" label={`${t.benchPress} (kg)`} control={form.control} t={t} />
        <InputField name="targetHeartRate" label={`${t.targetHeartRate} (bpm)`} control={form.control} t={t} />
        <Button type="submit">{t.calculateButton}</Button>
      </form>
    </Form>
  );
};

export default InputForm;