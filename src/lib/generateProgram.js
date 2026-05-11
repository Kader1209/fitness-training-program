// =====================================================
// Moteur de génération de programme NEUREX (local, déterministe)
// =====================================================

const EXERCISES = {
  push_gym: [
    { name: "Développé couché barre", sets: 4, reps: "6-8", rest: 120 },
    { name: "Développé incliné haltères", sets: 3, reps: "8-10", rest: 90 },
    { name: "Dips lestés", sets: 3, reps: "8-12", rest: 90 },
    { name: "Élévations latérales", sets: 4, reps: "12-15", rest: 60 },
    { name: "Extensions triceps poulie", sets: 3, reps: "10-12", rest: 60 },
  ],
  pull_gym: [
    { name: "Tractions lestées", sets: 4, reps: "6-8", rest: 120 },
    { name: "Rowing barre", sets: 4, reps: "8-10", rest: 90 },
    { name: "Tirage horizontal", sets: 3, reps: "10-12", rest: 75 },
    { name: "Curl barre", sets: 3, reps: "8-10", rest: 60 },
    { name: "Curl marteau", sets: 3, reps: "10-12", rest: 60 },
  ],
  legs_gym: [
    { name: "Squat barre", sets: 4, reps: "6-8", rest: 150 },
    { name: "Soulevé de terre roumain", sets: 3, reps: "8-10", rest: 120 },
    { name: "Presse à cuisses", sets: 3, reps: "10-12", rest: 90 },
    { name: "Leg curl allongé", sets: 3, reps: "10-12", rest: 60 },
    { name: "Mollets debout", sets: 4, reps: "12-15", rest: 45 },
  ],
  full_gym: [
    { name: "Squat barre", sets: 4, reps: "6-8", rest: 120 },
    { name: "Développé couché", sets: 4, reps: "6-8", rest: 120 },
    { name: "Tractions", sets: 3, reps: "max", rest: 90 },
    { name: "Rowing haltère", sets: 3, reps: "10", rest: 75 },
    { name: "Gainage planche", sets: 3, reps: "45s", rest: 45 },
  ],
  push_home: [
    { name: "Pompes serrées", sets: 4, reps: "12-15", rest: 75 },
    { name: "Pompes inclinées pieds surélevés", sets: 3, reps: "10-12", rest: 90 },
    { name: "Dips entre deux chaises", sets: 3, reps: "10-15", rest: 75 },
    { name: "Pike push-ups (épaules)", sets: 3, reps: "8-12", rest: 75 },
    { name: "Élévations bouteilles d'eau", sets: 3, reps: "15", rest: 45 },
  ],
  pull_home: [
    { name: "Tractions porte/barre", sets: 4, reps: "max", rest: 120 },
    { name: "Rowing serviette (en isométrie)", sets: 3, reps: "30s", rest: 60 },
    { name: "Tirage élastique", sets: 3, reps: "15", rest: 60 },
    { name: "Curl bouteilles d'eau", sets: 3, reps: "15", rest: 45 },
    { name: "Superman au sol", sets: 3, reps: "15", rest: 45 },
  ],
  legs_home: [
    { name: "Squat sauté", sets: 4, reps: "12-15", rest: 75 },
    { name: "Fentes alternées", sets: 3, reps: "12 / jambe", rest: 75 },
    { name: "Hip thrust au sol", sets: 3, reps: "15", rest: 60 },
    { name: "Squat bulgare chaise", sets: 3, reps: "10 / jambe", rest: 60 },
    { name: "Mollets debout", sets: 4, reps: "20", rest: 30 },
  ],
  full_home: [
    { name: "Burpees", sets: 4, reps: "12", rest: 90 },
    { name: "Pompes diamant", sets: 3, reps: "10-15", rest: 60 },
    { name: "Squat sauté", sets: 3, reps: "15", rest: 60 },
    { name: "Mountain climbers", sets: 3, reps: "30s", rest: 45 },
    { name: "Gainage planche", sets: 3, reps: "60s", rest: 45 },
  ],
  cardio: [
    { name: "Course intermittente (HIIT)", sets: 6, reps: "30s ON / 60s OFF", rest: 60 },
    { name: "Vélo modéré", sets: 1, reps: "25 min · zone 2", rest: 0 },
    { name: "Corde à sauter", sets: 5, reps: "2 min", rest: 60 },
  ],
  mobility: [
    { name: "Mobilité hanches", sets: 2, reps: "8 mvts", rest: 30 },
    { name: "Étirement chaîne post.", sets: 2, reps: "45s", rest: 20 },
    { name: "Cat / Cow + thoracique", sets: 2, reps: "10 reps", rest: 20 },
    { name: "Ouverture épaules", sets: 2, reps: "45s", rest: 20 },
  ],
};

const SPLITS = {
  3: ["push", "pull", "legs"],
  4: ["push", "pull", "legs", "full"],
  5: ["push", "pull", "legs", "push", "pull"],
  6: ["push", "pull", "legs", "push", "pull", "legs"],
};

const DAY_LABELS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export function generateProgram(profile) {
  const {
    sex = "male",
    age = 25,
    height = 175,
    weight = 75,
    level = "intermediate",
    goal = "muscle",
    frequency = 4,
    place = "gym",
    cardio = "yes",
  } = profile;

  // ====== Métabolisme ======
  // Mifflin-St Jeor
  const bmr =
    sex === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier = {
    2: 1.4,
    3: 1.55,
    4: 1.65,
    5: 1.725,
    6: 1.8,
  }[frequency] || 1.55;

  const tdee = Math.round(bmr * activityMultiplier);

  // ====== Calories cible selon objectif ======
  let calorieAdjust = 0;
  if (goal === "muscle") calorieAdjust = 350;
  else if (goal === "cut") calorieAdjust = -450;
  else if (goal === "recomp") calorieAdjust = -150;
  else if (goal === "performance") calorieAdjust = 150;
  // maintenance => 0

  const targetCalories = Math.round(tdee + calorieAdjust);

  // ====== Macros ======
  let proteinPerKg = 1.8;
  if (goal === "cut") proteinPerKg = 2.3;
  if (goal === "muscle") proteinPerKg = 2.0;
  if (goal === "recomp") proteinPerKg = 2.2;
  if (goal === "performance") proteinPerKg = 1.9;

  const protein = Math.round(weight * proteinPerKg);
  const fat = Math.round((targetCalories * 0.27) / 9);
  const carbs = Math.max(
    50,
    Math.round((targetCalories - protein * 4 - fat * 9) / 4),
  );

  // ====== IMC ======
  const bmi = +(weight / (height / 100) ** 2).toFixed(1);
  let bmiLabel = "Normal";
  if (bmi < 18.5) bmiLabel = "Maigre";
  else if (bmi >= 25 && bmi < 30) bmiLabel = "Surpoids";
  else if (bmi >= 30) bmiLabel = "Obésité";

  // ====== Score utilisateur ======
  const levelScore = { beginner: 55, intermediate: 75, advanced: 90 }[level] || 70;
  const freqBonus = Math.min(frequency * 2, 12);
  const ageMalus = age > 40 ? Math.min((age - 40) * 0.5, 8) : 0;
  const score = Math.min(
    98,
    Math.max(35, Math.round(levelScore + freqBonus - ageMalus)),
  );

  // ====== Niveau physique estimé ======
  const physicalLevel = {
    beginner: { label: "Apprenti", grade: "C+", color: "#0099cc" },
    intermediate: { label: "Confirmé", grade: "A-", color: "#00d9ff" },
    advanced: { label: "Athlète", grade: "S", color: "#4efff3" },
  }[level];

  // ====== Objectif détecté ======
  const goalMeta = {
    muscle: {
      label: "Hypertrophie musculaire",
      desc: "Gain de masse maigre avec surplus calorique contrôlé.",
    },
    cut: {
      label: "Sèche & définition",
      desc: "Perte de masse grasse avec préservation musculaire maximale.",
    },
    recomp: {
      label: "Recomposition corporelle",
      desc: "Perte de gras + gain musculaire en parallèle.",
    },
    performance: {
      label: "Performance athlétique",
      desc: "Force, puissance et capacité de travail accrues.",
    },
    maintenance: {
      label: "Maintenance & santé",
      desc: "Stabilisation des acquis et progression douce.",
    },
  }[goal];

  // ====== Programme hebdomadaire ======
  const split = SPLITS[frequency] || SPLITS[4];
  const restDayCount = 7 - split.length;
  const week = [];
  let trainingIdx = 0;

  for (let i = 0; i < 7; i++) {
    const distributeRest =
      restDayCount > 0 &&
      ((i === 3 && restDayCount >= 1) ||
        (i === 6 && restDayCount >= 2) ||
        (i === 5 && restDayCount >= 3) ||
        (i === 1 && restDayCount >= 4));

    if (distributeRest || trainingIdx >= split.length) {
      week.push({
        day: DAY_LABELS[i],
        type: "rest",
        title: "Récupération active",
        focus: "Marche · sommeil · hydratation",
        exercises: EXERCISES.mobility.slice(0, 2),
        duration: 20,
      });
    } else {
      const block = split[trainingIdx];
      const key = `${block}_${place === "home" ? "home" : "gym"}`;
      const exercises = [...(EXERCISES[key] || EXERCISES.full_gym)];
      if (cardio === "yes" && (i === 2 || i === 5)) {
        exercises.push(EXERCISES.cardio[0]);
      }
      week.push({
        day: DAY_LABELS[i],
        type: "train",
        title: blockTitle(block),
        focus: blockFocus(block),
        exercises,
        duration: 55 + Math.floor(Math.random() * 15),
      });
      trainingIdx++;
    }
  }

  // ====== Eau ======
  const waterLiters = +(weight * 0.035).toFixed(1);

  return {
    profile,
    metrics: {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      protein,
      carbs,
      fat,
      bmi,
      bmiLabel,
      water: waterLiters,
      score,
    },
    physicalLevel,
    goalMeta,
    week,
    generatedAt: new Date().toISOString(),
  };
}

function blockTitle(block) {
  return {
    push: "PUSH · Pectoraux · Épaules · Triceps",
    pull: "PULL · Dos · Biceps",
    legs: "LEGS · Quadriceps · Ischios · Mollets",
    full: "FULL BODY · Force globale",
  }[block];
}

function blockFocus(block) {
  return {
    push: "Force horizontale + verticale",
    pull: "Tirage vertical + horizontal",
    legs: "Bilatéral + unilatéral",
    full: "Polyarticulaire",
  }[block];
}
