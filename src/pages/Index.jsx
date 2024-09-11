import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { calculateAll } from '../utils/calculations';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';
import { translations } from '../utils/translations';
import { ThemeProvider } from 'next-themes';

const Index = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');

  const handleCalculate = (formData) => {
    try {
      const calculatedResults = calculateAll(formData);
      setResults(calculatedResults);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResults(null);
    }
  };

  const t = translations[language];

  return (
    <ThemeProvider attribute="class">
      <div className="container mx-auto p-4">
        <div className="flex justify-end space-x-2 mb-4">
          <ThemeToggle />
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">{t.title}</h1>
        <Card>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="input">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="input">{t.inputTab}</TabsTrigger>
                <TabsTrigger value="results" disabled={!results}>{t.resultsTab}</TabsTrigger>
              </TabsList>
              <TabsContent value="input">
                <InputForm onCalculate={handleCalculate} language={language} />
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </TabsContent>
              <TabsContent value="results">
                {results && <ResultsDisplay results={results} language={language} />}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default Index;