import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translations } from '../utils/translations';

const ResultsDisplay = ({ results, language }) => {
  const t = translations[language];

  const chartData = [
    { name: t.bmi, value: results.bmi },
    { name: t.bodyFatPercentage, value: results.bodyFatPercentage },
    { name: t.leanMass, value: results.leanBodyMass },
    { name: t.waistToHipRatio, value: results.waistToHipRatio },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.basicMeasurements}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>{t.bmi}:</strong> {results.bmi.toFixed(2)} - {t[results.bmiCategory]}</p>
          <p><strong>{t.bmr}:</strong> {results.bmr.toFixed(0)} {t.caloriesPerDay}</p>
          <p><strong>{t.tdee}:</strong> {results.tdee.toFixed(0)} {t.caloriesPerDay}</p>
          <p><strong>{t.bodyFatPercentage}:</strong> {results.bodyFatPercentage.toFixed(1)}%</p>
          <p><strong>{t.idealWeightRange}:</strong> {results.idealWeightRange.min.toFixed(1)} - {results.idealWeightRange.max.toFixed(1)} kg</p>
        </CardContent>
      </Card>

      {/* Add other result cards here */}

      <Card>
        <CardHeader>
          <CardTitle>{t.visualization}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;