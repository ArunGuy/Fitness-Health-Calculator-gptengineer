import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsDisplay = ({ results }) => {
  const chartData = [
    { name: 'BMI', value: results.bmi },
    { name: 'Body Fat %', value: results.bodyFatPercentage },
    { name: 'Lean Mass', value: results.leanBodyMass },
    { name: 'Waist-Hip Ratio', value: results.waistToHipRatio },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Measurements</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>BMI:</strong> {results.bmi.toFixed(2)} - {results.bmiCategory}</p>
          <p><strong>BMR:</strong> {results.bmr.toFixed(0)} calories/day</p>
          <p><strong>TDEE:</strong> {results.tdee.toFixed(0)} calories/day</p>
          <p><strong>Body Fat Percentage:</strong> {results.bodyFatPercentage.toFixed(1)}%</p>
          <p><strong>Ideal Weight Range:</strong> {results.idealWeightRange.min.toFixed(1)} - {results.idealWeightRange.max.toFixed(1)} kg</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calorie Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Weight Loss (0.5 kg/week):</strong> {results.calorieGoals.weightLoss.toFixed(0)} calories/day</p>
          <p><strong>Weight Gain (0.5 kg/week):</strong> {results.calorieGoals.weightGain.toFixed(0)} calories/day</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Macronutrient Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Protein:</strong> {results.macronutrients.protein.toFixed(0)}g ({(results.macronutrients.protein * 4).toFixed(0)} calories)</p>
          <p><strong>Carbohydrates:</strong> {results.macronutrients.carbs.toFixed(0)}g ({(results.macronutrients.carbs * 4).toFixed(0)} calories)</p>
          <p><strong>Fat:</strong> {results.macronutrients.fat.toFixed(0)}g ({(results.macronutrients.fat * 9).toFixed(0)} calories)</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Lean Body Mass:</strong> {results.leanBodyMass.toFixed(1)} kg</p>
          <p><strong>Waist-to-Hip Ratio:</strong> {results.waistToHipRatio.toFixed(2)}</p>
          <p><strong>Daily Water Intake:</strong> {results.dailyWaterIntake.toFixed(1)} liters</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visualization</CardTitle>
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