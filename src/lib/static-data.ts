/**
 * Static site data — about page content and social links.
 */

import type { AboutData } from "./types";

export const aboutData: AboutData = {
  bio: "Senior Software Engineer based in the Netherlands with over a decade of experience building and scaling enterprise systems across Europe and Asia. Specializing in backend engineering (Java, PHP, Go), cloud infrastructure, and DevOps automation using AWS, GCP, Kubernetes, and Terraform.\n\nCurrently at Dow Jones (Eco-Movement), working on scaling, modernization and microservices initiatives. Previously contributed to large-scale cloud transformations at Mimecast and Seven Senders. He has written several articles on software engineering and technology and is a regular open source contributor.\n\nAWS Community Builder, HashiCorp UG Organizer, Top 10 ADPList Mentor in DevOps, and founder of Klassroom.xyz — an education platform serving 18,000+ learners worldwide.",
  photo: "/images/sumon-selim.webp",
  beyondCode: "Beyond code, Sumon is a passionate traveler who has visited 50+ countries and believes in experiencing different cultures first-hand. One Young World Ambassador and Yunus & Youth Fellow — passionate about social impact and youth leadership. He has volunteered with several non-profit organisations worldwide.\n\nWinner of Startup Weekend Dhaka 2013, BYLC Youth Leadership Prize 2016, and Runners-up of the Social Business Youth Champ 2017. When he's not coding or traveling, you'll find him organising and speaking at different community events, mentoring aspiring engineers, or exploring new entrepreneurial ideas.",
  socials: [
    { label: "GitHub",         url: "https://github.com/SumonMSelim",                         cmd: "github.com/SumonMSelim" },
    { label: "LinkedIn",       url: "https://linkedin.com/in/sumonmselim",                    cmd: "linkedin.com/in/sumonmselim" },
    { label: "ADPList",        url: "https://adplist.org/mentors/muhammad-sumon-molla-selim", cmd: "adplist.org/mentors/muhammad-sumon-molla-selim" },
    { label: "Stack Overflow", url: "https://stackoverflow.com/users/1334933/",               cmd: "stackoverflow.com/users/1334933" },
    { label: "SpeakerDeck",    url: "https://speakerdeck.com/sumonmselim",                    cmd: "speakerdeck.com/sumonmselim" },
    { label: "Sessionize",     url: "https://sessionize.com/sumonmselim",                     cmd: "sessionize.com/sumonmselim" },
    { label: "Slides",         url: "https://slides.com/sumonmselim",                         cmd: "slides.com/sumonmselim" },
    { label: "Email",          url: "mailto:sumonmselim@gmail.com",                           cmd: "sumonmselim@gmail.com" },
  ],
};
