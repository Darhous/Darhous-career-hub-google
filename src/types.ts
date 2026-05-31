export type CVAnalysisResult = {
  overall_score: number;
  keyword_score: number;
  skills_score: number;
  experience_score: number;
  formatting_score: number;
  readability_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  weak_bullet_points: { original: string; suggestion: string }[];
  keywords_missing: string[];
  recommendations: string[];
  job_description_match_details?: string;
  role_optimization_suggestions: string[];
  raw?: string;
};

export type JobTarget = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  salary?: string;
  description: string;
  missingSkills?: string[];
  matchReasons?: string[];
  cvSuggestions?: string[];
};

export type CVData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: string[];
  projects: {
    id: string;
    title: string;
    description: string;
    link: string;
  }[];
  certifications: string[];
  languages: string[];
};
