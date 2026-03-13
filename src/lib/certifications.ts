// Auto-generated — do not edit by hand.
// Regenerate: docker compose exec web node scripts/sync-certifications.mjs

import type { ImageMetadata } from "astro";
import img_aws_certified_solutions_architect_associate from "@/assets/certifications/aws-certified-solutions-architect-associate.png";
import img_aws_certified_sysops_administrator_associate from "@/assets/certifications/aws-certified-sysops-administrator-associate.png";
import img_aws_certified_developer_associate from "@/assets/certifications/aws-certified-developer-associate.png";
import img_hashicorp_certified_terraform_associate_003 from "@/assets/certifications/hashicorp-certified-terraform-associate-003.png";
import img_aws_certified_cloud_practitioner from "@/assets/certifications/aws-certified-cloud-practitioner.png";

export interface Certification {
  name: string;
  image: ImageMetadata;
  badgeUrl: string;
  issuer: string;
  issuedAt: string;
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    image: img_aws_certified_solutions_architect_associate,
    badgeUrl: "",
    issuer: "issued by Amazon Web Services Training and Certification",
    issuedAt: "2023-05-09",
  },
  {
    name: "AWS Certified SysOps Administrator – Associate",
    image: img_aws_certified_sysops_administrator_associate,
    badgeUrl: "",
    issuer: "issued by Amazon Web Services Training and Certification",
    issuedAt: "2025-05-20",
  },
  {
    name: "AWS Certified Developer – Associate",
    image: img_aws_certified_developer_associate,
    badgeUrl: "",
    issuer: "issued by Amazon Web Services Training and Certification",
    issuedAt: "2023-08-06",
  },
  {
    name: "HashiCorp Certified: Terraform Associate (003)",
    image: img_hashicorp_certified_terraform_associate_003,
    badgeUrl: "",
    issuer: "issued by HashiCorp",
    issuedAt: "2024-12-10",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    image: img_aws_certified_cloud_practitioner,
    badgeUrl: "",
    issuer: "issued by Amazon Web Services Training and Certification",
    issuedAt: "2023-12-10",
  }
];
