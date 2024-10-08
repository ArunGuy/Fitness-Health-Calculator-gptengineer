import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translations } from '../utils/translations';

const ResultsDisplay = ({ results, language }) => {
  const t = translations[language];

  const formatNumber = (num) => Number(num).toFixed(2);

  const chartData = [
    { name: t.bmi, value: results.bmi },
    { name: t.bodyFatPercentage, value: results.bodyFatPercentage },
    { name: t.leanBodyMass, value: results.leanBodyMass },
    { name: t.waistToHipRatio, value: results.waistToHipRatio },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.basicMeasurements}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>{t.bmi}:</strong> {formatNumber(results.bmi)} - {t[results.bmiCategory]}</p>
          <p><strong>{t.bmr}:</strong> {formatNumber(results.bmr)} {t.caloriesPerDay}</p>
          <p><strong>{t.tdee}:</strong> {formatNumber(results.tdee)} {t.caloriesPerDay}</p>
          <p><strong>{t.bodyFatPercentage}:</strong> {formatNumber(results.bodyFatPercentage)}%</p>
          <p><strong>{t.idealWeightRange}:</strong> {formatNumber(results.idealWeightRange.min)} - {formatNumber(results.idealWeightRange.max)} kg</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.bodyComposition}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>{t.leanBodyMass}:</strong> {formatNumber(results.leanBodyMass)} kg</p>
          <p><strong>{t.waistToHipRatio}:</strong> {formatNumber(results.waistToHipRatio)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.nutritionInfo}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>{t.dailyWaterIntake}:</strong> {formatNumber(results.dailyWaterIntake)} L</p>
          <p><strong>{t.weightLossCalories}:</strong> {formatNumber(results.calorieGoals.weightLoss)} {t.caloriesPerDay}</p>
          <p><strong>{t.weightGainCalories}:</strong> {formatNumber(results.calorieGoals.weightGain)} {t.caloriesPerDay}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.macronutrients}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>{t.protein}:</strong> {formatNumber(results.macronutrients.protein)} g</p>
          <p><strong>{t.carbs}:</strong> {formatNumber(results.macronutrients.carbs)} g</p>
          <p><strong>{t.fat}:</strong> {formatNumber(results.macronutrients.fat)} g</p>
        </CardContent>
      </Card>

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