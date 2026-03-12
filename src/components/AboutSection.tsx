import TerminalCard from "./TerminalCard";
import TerminalTyping from "./TerminalTyping";
import AnimatedSection from "./AnimatedSection";
import RotatingText from "./RotatingText";

const skills: { name: string; icon: string; imgClass?: string }[] = [
  { name: "Go",         icon: "/images/skills/go.svg" },
  { name: "Java",       icon: "/images/skills/openjdk.svg" },
  { name: "PHP",        icon: "/images/skills/php.svg" },
  { name: "Python",     icon: "/images/skills/python.svg" },
  { name: "JavaScript", icon: "/images/skills/javascript.svg" },
  { name: "AWS",        icon: "/images/skills/aws.svg" },
  { name: "GCP",        icon: "/images/skills/googlecloud.svg" },
  { name: "Docker",     icon: "/images/skills/docker.svg" },
  { name: "Kubernetes", icon: "/images/skills/kubernetes.svg" },
  { name: "Terraform",  icon: "/images/skills/terraform.svg" },
  { name: "Laravel",    icon: "/images/skills/laravel.svg" },
  { name: "React",      icon: "/images/skills/react.svg" },
  { name: "PostgreSQL", icon: "/images/skills/postgresql.svg" },
  { name: "MySQL",      icon: "/images/skills/mysql.svg" },
  { name: "MongoDB",    icon: "/images/skills/mongodb.svg" },
  { name: "Git",        icon: "/images/skills/git.svg" },
  { name: "GitHub",     icon: "/images/skills/github.svg", imgClass: "dark:invert" },
  { name: "Jenkins",    icon: "/images/skills/jenkins.svg" },
];

const email = ["sumonmselim", "@", "gmail", ".", "com"].join("");

const bioLines = [
  { prefix: "$", text: "whoami" },
  { prefix: ">", text: "Muhammad Sumon Molla Selim", className: "text-primary dark:text-foreground" },
  { prefix: "$", text: "cat role.txt" },
  { prefix: ">", text: "Senior Software Engineer @ Dow Jones", className: "text-primary dark:text-foreground" },
  { prefix: "$", text: "cat community.txt" },
  { prefix: ">", text: "AWS Community Builder", className: "text-primary dark:text-foreground" },
  { prefix: ">", text: "HashiCorp UG Organizer", className: "text-primary dark:text-foreground" },
  { prefix: ">", text: "Admin, Laravel Bangladesh Community", className: "text-primary dark:text-foreground" },
  { prefix: "$", text: "echo $LOCATION" },
  { prefix: ">", text: "Purmerend, Netherlands 🇳🇱", className: "text-primary dark:text-foreground" },
  { prefix: "$", text: "mail" },
  { prefix: ">", text: email, className: "text-primary dark:text-foreground" },
];

const AboutSection = () => (
  <AnimatedSection>
    <section id="about" className="py-20 relative scroll-mt-20" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 id="about-heading" className="font-display text-xl sm:text-2xl text-foreground leading-tight mb-10">
          <span className="font-mono text-primary text-lg sm:text-xl">$ ./</span>
          <RotatingText text="about" interval={5000} />
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <TerminalCard title="bio.sh">
            <TerminalTyping lines={bioLines} typingSpeed={28} lineDelay={380} />
          </TerminalCard>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🧬", title: "Polyglot", desc: "PHP, Go, Java, Python to DevOps across AWS, GCP & Terraform." },
              { icon: "🌍", title: "World Traveler", desc: "Visited 50 countries so far." },
              { icon: "🎤", title: "Tech Speaker", desc: "Speaker at various conferences and meetups." },
              { icon: "⭐", title: "Open Source", desc: "1.2k+ GitHub followers, active contributor." },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="card-hover p-4 rounded-lg border border-border bg-card"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <h3 className="font-mono text-sm font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 mt-6">
            <p className="font-mono text-sm text-muted-foreground mb-4">
              <span className="text-primary">$</span>{" cat stack.txt"}
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-9 gap-3">
              {skills.map(({ name, icon, imgClass }) => (
                <div
                  key={name}
                  className="card-hover flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-card"
                  title={name}
                >
                  <img
                    src={icon}
                    alt={`${name} logo`}
                    className={`w-7 h-7 sm:w-8 sm:h-8 dark:brightness-110 ${imgClass ?? ""}`}
                    loading="lazy"
                  />
                  <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground text-center leading-tight">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 mt-4">
            <a href="/about" className="cli-command inline-block">
              &gt;<span className="cursor-blink">_</span> ./about --verbose
            </a>
          </div>
        </div>
      </div>
    </section>
  </AnimatedSection>
);

export default AboutSection;
