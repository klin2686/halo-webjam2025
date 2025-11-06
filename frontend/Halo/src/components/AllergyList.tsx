// What we want to use in frontend
export interface Allergy {
  id: number;
  allergen: string;
  severity: string;
}

// List of allergy item data from backend
interface AllergyItem {
  id: number;
  allergen_id: number;
  allergen_name: string;
  severity: number;
  user_id: number;
}

//This is the backend response
interface AllergyAPIResponse {
  message: string;
  user_allergy: AllergyItem[];
}

const severityToString = (severity: number): string => {
  switch (severity) {
    case 1:
      return "mild";
    case 2:
      return "moderate";
    case 3:
      return "severe";
    default:
      return "mild";
  }
};

export const defaultAllergyList: Allergy[] = [
  { id: 1, allergen: "Peanuts", severity: "severe" },
  { id: 2, allergen: "Shellfish", severity: "moderate" },
  { id: 3, allergen: "Soy", severity: "mild" },
];

export const fetchAllergies = async (): Promise<Allergy[]> => {
  try {
    const response = await fetch(
      "https://wj-api-dev-ff3daf2f73bd.herokuapp.com/api/allergy/get",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NjI1OTc4ODUsImlhdCI6MTc2MjQyNTA4NSwidHlwZSI6ImFjY2VzcyJ9.7ZqUFKWLxHuoyXOUT_ug9X1Inn1O5lZeEgSdf9v0Ed8",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AllergyAPIResponse = await response.json();
    return data.user_allergy.map((item) => ({
      id: item.id,
      allergen: item.allergen_name,
      severity: severityToString(item.severity),
    }));
  } catch (error) {
    console.error("Error fetching allergies:", error);
    return defaultAllergyList;
  }
};
