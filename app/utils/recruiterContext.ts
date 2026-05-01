import { expertiseAndSkills, projects, workExperience } from "./data";

const skillsBlock = expertiseAndSkills
  .map(
    (s) =>
      `${s.title}: ${s.description} Technologies include ${s.technologies.join(", ")}.`,
  )
  .join("\n");

const projectsBlock = projects
  .map(
    (p) =>
      `${p.title} (${p.date}): ${p.description} Stack: ${(p.technologiesUsed ?? []).join(", ")}.`,
  )
  .join("\n");

const experienceBlock = workExperience
  .map(
    (w) =>
      `${w.date} — ${w.title} at ${w.companyName}. ${w.description} Tools: ${w.tools.join(", ")}.`,
  )
  .join("\n");

export const RECRUITER_KNOWLEDGE_BASE = `
Profile: Kenny Quach. Senior Frontend Engineer; home page describes him as "Full Stack Engineer crafting immersive, scalable, and user-friendly web experiences"; based in the NYC metropolitan area with 5+ years of experience highlighted on the portfolio; enjoys turning designs into fullstack solutions while maintaining code quality and performance; recently diving deep into AI tools.

Links: LinkedIn https://www.linkedin.com/in/kennyquach/ | GitHub https://github.com/kquach229

Skills & expertise:
${skillsBlock}

Work history (summaries as on the portfolio; newest listed first in site data):
${experienceBlock}

Selected projects:
${projectsBlock}

Certifications: AWS Certified Cloud Practitioner (shown on portfolio with badge).

Contact: Portfolio includes a contact form, resume download at /resume.pdf, and LinkedIn/GitHub.
`.trim();
