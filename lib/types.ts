import * as z from "zod";
import type * as Prisma from "@prisma/client";

// Define the form schema using Zod
export const reviewSchema = z
  .object({
    jobTitle: z.string().min(1, "Job title is required"),
    companyId: z.string().min(1, "Company is required"),
    contractType: z.enum(["INTERNSHIP", "CDI", "CDD", "FREELANCE", "OTHER"]),
    jobSource: z.enum([
      "FRIEND_REFERRAL",
      "LINKEDIN",
      "COMPANY_WEBSITE",
      "JOB_BOARD",
      "CAREER_FAIR",
      "OTHER",
    ]),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    salaryType: z.enum(["EXACT", "RANGE"]),
    salary: z.number().positive().optional(),
    salaryMin: z.number().positive().optional(),
    salaryMax: z.number().positive().optional(),
    location: z.string().min(1, "Location is required"),
    rating: z.number().min(1, "Rating is required").max(5),
    recommend: z.boolean(),
    anonymous: z.boolean(),
    interviewDifficulty: z.number().min(1).max(5),
    applicationDate: z.coerce.date().optional(),
    interviewProcess: z.string().optional(),
    description: z.string().min(1, "Review description is required"),
  })
  .refine(
    (data) => {
      if (data.salaryType === "EXACT") {
        return data.salary != null;
      }
      return data.salaryMin != null && data.salaryMax != null;
    },
    {
      message: "Please provide salary information",
      path: ["salary"],
    },
  )
  .refine(
    (data) => {
      if (data.salaryType === "RANGE") {
        return (data.salaryMin || 0) < (data.salaryMax || 0);
      }
      return true;
    },
    {
      message: "Maximum salary must be greater than minimum salary",
      path: ["salaryMax"],
    },
  );

export type ReviewFormValues = z.infer<typeof reviewSchema>;
export type CompanyType = Prisma.Company;
export type ReviewType = Prisma.Review;
export type ReviewWithCompany = Prisma.Review & {
  company: Prisma.Company;
};
