import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { calculateAll } from '../utils/calculations';

const Index = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Fitness & Health Calculator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="results" disabled={!results}>Results</TabsTrigger>
            </TabsList>
            <TabsContent value="input">
              <InputForm onCalculate={handleCalculate} />
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </TabsContent>
            <TabsContent value="results">
              {results && <ResultsDisplay results={results} />}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;