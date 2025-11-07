export interface Allergy {
  id: number;
  allergen: string;
  severity: string;
}

// Standard allergens from backend
export const STANDARD_ALLERGENS = [
  "milk",
  "eggs",
  "fish",
  "shellfish",
  "tree nuts",
  "peanuts",
  "wheat",
  "soybeans",
  "sesame",
];

interface AllergyItem {
  id: number;
  allergen_id: number;
  allergen_name: string;
  severity: number;
  user_id: number;
}

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
//testpush
export const defaultAllergyList: Allergy[] = [
  { id: 1, allergen: "Peanuts", severity: "severe" },
  { id: 2, allergen: "Shellfish", severity: "moderate" },
  { id: 3, allergen: "Soy", severity: "mild" },
];

export const fetchAllergies = async (
  accessToken: string
): Promise<Allergy[]> => {
  try {
    const API_BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const response = await fetch(`${API_BASE_URL}/allergy/get`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
