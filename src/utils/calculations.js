export const calculateAll = (data) => {
  const { age, gender, weight, height, activityLevel, waist, hip, neck } = data;

  // BMI calculation
  const bmi = weight / Math.pow(height / 100, 2);
  const bmiCategory = getBMICategory(bmi);

  // BMR calculation (Mifflin-St Jeor Equation)
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  // TDEE calculation
  const activityMultiplier = getActivityMultiplier(activityLevel);
  const tdee = bmr * activityMultiplier;

  // Body Fat Percentage calculation (U.S. Navy Method)
  const bodyFatPercentage = gender === 'male'
    ? 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
    : 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;

  // Ideal Weight Range (based on BMI 18.5 - 24.9)
  const idealWeightRange = {
    min: 18.5 * Math.pow(height / 100, 2),
    max: 24.9 * Math.pow(height / 100, 2)
  };

  // Calorie Calculator for Weight Loss/Gain
  const calorieGoals = {
    weightLoss: tdee - 500, // 0.5 kg/week loss
    weightGain: tdee + 500  // 0.5 kg/week gain
  };

  // Macronutrient Calculator (example distribution: 30% protein, 40% carbs, 30% fat)
  const macronutrients = {
    protein: (tdee * 0.30) / 4,
    carbs: (tdee * 0.40) / 4,
    fat: (tdee * 0.30) / 9
  };

  // Lean Body Mass
  const leanBodyMass = weight * (1 - bodyFatPercentage / 100);

  // Waist-to-Hip Ratio
  const waistToHipRatio = waist / hip;

  // Daily Water Intake (simple calculation: 30ml per kg of body weight)
  const dailyWaterIntake = weight * 0.03;

  return {
    bmi,
    bmiCategory,
    bmr,
    tdee,
    bodyFatPercentage,
    idealWeightRange,
    calorieGoals,
    macronutrients,
    leanBodyMass,
    waistToHipRatio,
    dailyWaterIntake
  };
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

const getActivityMultiplier = (activityLevel) => {
  switch (activityLevel) {
    case 'sedentary': return 1.2;
    case 'light': return 1.375;
    case 'moderate': return 1.55;
    case 'active': return 1.725;
    case 'veryActive': return 1.9;
    default: return 1.55;
  }
};