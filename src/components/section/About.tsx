"use client";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub, FaMailchimp } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Full Stack Developer",
    avatar: "/placeholder.svg",
    bio: "Specialized in React, Node.js, and cloud architecture. 5+ years of experience building scalable web applications.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "alex@kylo.dev",
  },
  {
    name: "Sarah Chen",
    role: "Mobile Developer",
    avatar: "/placeholder.svg",
    bio: "Expert in React Native and Flutter. Passionate about creating beautiful, performant mobile experiences.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "sarah@kylo.dev",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".team-card");
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-secondary/30 flex  justify-center items-center min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Two passionate developers committed to delivering exceptional digital solutions</p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="team-card p-8 card-hover-effect">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-6">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground mb-6">{member.bio}</p>
                <div className="flex gap-4">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <FaGithub className="h-5 w-5" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    <FaMailchimp className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
