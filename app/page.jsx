"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Globe,
  Server,
  Award,
  BookOpen,
  Briefcase,
  Phone,
  Send,
  Terminal,
  Cpu,
  Layers,
  Menu,
  X,
  MapPin,
  CheckCircle,
  Link as LinkIcon
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Typing Effect Component
function TypingEffect({ words, speed = 100, delay = 2000 }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [text, setText] = useState("")
// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [message, setMessage] = useState("");

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay)
      return () => clearTimeout(timeout)
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [subIndex, reverse, index, words, speed, delay])

  useEffect(() => {
    setText(words[index].substring(0, subIndex))
  }, [subIndex, index, words])

  return (
    <span className="text-red-500 border-r-2 border-red-500 pr-1 animate-pulse font-mono">
      {text}
    </span>
  )
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const words = [
    "Blockchain Engineer",
    "Full Stack Developer",
    "Web3 Developer",
    "Research Intern"
  ]

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "projects", "skills", "achievements", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated form submission
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 4000)
  }

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmitcontact = async (e) => {
  e.preventDefault();

  const response = await fetch("/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (data.success) {
    alert("Message sent!");
  } else {
    alert("Failed to send message.");
  }
};

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-red-600 selection:text-white relative overflow-hidden">
      
      {/* Background Animated smoke red blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-red-950/15 blur-[120px] animate-smoke-1"></div>
        <div className="absolute top-[40%] right-[-10%] w-[25rem] h-[25rem] rounded-full bg-red-900/10 blur-[100px] animate-smoke-2"></div>
        <div className="absolute bottom-[10%] left-[15%] w-[35rem] h-[35rem] rounded-full bg-red-950/10 blur-[140px] animate-smoke-1"></div>
      </div>

      {/* Modern Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-red-950/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="font-serif text-2xl font-bold tracking-wider text-red-500 hover:text-red-400 transition-colors duration-300 cursor-pointer" onClick={() => handleNavClick("home")}>
              Divyanshu
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {["home", "experience", "projects", "skills", "achievements", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-sm uppercase tracking-widest hover:text-red-400 transition-colors duration-300 relative py-2 ${
                  activeSection === item ? "text-red-500 font-semibold" : "text-neutral-400"
                }`}
              >
                {item}
                {activeSection === item && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-400 hover:text-red-500 transition-colors p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {["home", "experience", "projects", "skills", "achievements", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-xl uppercase tracking-widest hover:text-red-500 transition-colors ${
                  activeSection === item ? "text-red-500 font-bold" : "text-neutral-400"
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-36">

        {/* Hero Section - Matching the Reference Design */}
        <section id="home" className="min-h-[80vh] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl glass-effect rounded-[30px] p-8 md:p-12 shadow-red-glow border border-red-950/40 relative overflow-hidden"
          >
            <div className="grid md:grid-cols-12 gap-10 items-center">
              
              {/* Profile Image Container with Moon Backdrop */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-64 h-[22rem] overflow-hidden rounded-[40px] md:rounded-[55px] border-2 border-red-500/20 shadow-red-glow flex justify-center items-center bg-neutral-950 group">
                  {/* Glowing Moon Behind Portrait */}
                  <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-red-600 to-red-950 top-10 right-4 blur-[2px] opacity-80 shadow-[0_0_35px_rgba(220,38,38,0.45)] group-hover:scale-105 transition-transform duration-700"></div>
                  
                  {/* User Profile Photo */}
                  <img
                    src="/divyanshu.png"
                    alt="Divyanshu Uttam"
                    className="absolute inset-0 object-cover w-full h-full filter brightness-[0.85] contrast-[1.05] group-hover:scale-[1.02] transition-transform duration-700 select-none z-10"
                  />
                  
                  {/* Bottom Vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-20"></div>
                </div>
              </div>

              {/* Bio & Details Container */}
              <div className="md:col-span-7 space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-serif">
                    Hi, It's <span className="text-red-500 text-red-glow">Divyanshu Uttam</span>
                  </h1>
                  <h2 className="text-xl md:text-3xl font-medium tracking-wide min-h-[40px]">
                    I'm a <TypingEffect words={words} />
                  </h2>
                </div>

                <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                  B.Tech IT student at IIIT Bhopal with expertise in building decentralized, secure Web3 smart contracts and high-performance backend systems. Passionate about solving complex architecture bottlenecks.
                </p>

                {/* Social Circle Links */}
                <div className="flex justify-center md:justify-start gap-4">
                  {[
                    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/divyanshu-uttam-87391423b/" },
                    { icon: <Github className="h-5 w-5" />, href: "https://github.com/divyanshu978" },
                    { icon: <Mail className="h-5 w-5" />, href: "mailto:divyanshuuttam978@gmail.com" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-500 hover:shadow-red-glow transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                  <Button
                    onClick={() => handleNavClick("contact")}
                    className="rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wider px-8 py-6 border border-red-500/50 hover:shadow-red-glow hover:scale-105 transition-all duration-300"
                  >
                    Hire me
                  </Button>
                  <Button
                    onClick={() => handleNavClick("projects")}
                    variant="outline"
                    className="rounded-full bg-transparent border border-neutral-700 text-neutral-300 hover:text-white hover:border-red-500 hover:bg-red-950/10 px-8 py-6 hover:scale-105 transition-all duration-300"
                  >
                    Explore Projects
                  </Button>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="scroll-mt-24">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-wide text-white">
                Education & <span className="text-red-500">Experience</span>
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                My academic journey at IIIT Bhopal and research internship in blockchain architecture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              
              {/* Education Box */}
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-effect rounded-3xl p-8 border border-red-950/20 shadow-red-glow-hover transition-all duration-500 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-red-500">
                    <BookOpen className="h-6 w-6" />
                    <span className="uppercase text-sm tracking-widest font-semibold">Education</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Bachelor of Technology</h3>
                    <h4 className="text-lg text-neutral-300">Information Technology</h4>
                    <p className="text-neutral-400 font-medium">Indian Institute of Information Technology, Bhopal</p>
                  </div>

                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Focusing on advanced IT coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Distributed Systems, Object-Oriented Programming (OOPs).
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-red-950/30 flex justify-between items-center text-sm">
                  <span className="text-red-500 font-semibold font-mono bg-red-950/30 px-3 py-1 rounded-full">CGPA: 7.3 / 10</span>
                  <span className="text-neutral-500 font-medium">Sep 2023 - Present</span>
                </div>
              </motion.div>

              {/* Research Internship Box */}
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-effect rounded-3xl p-8 border border-red-950/20 shadow-red-glow-hover transition-all duration-500 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-red-500">
                    <Briefcase className="h-6 w-6" />
                    <span className="uppercase text-sm tracking-widest font-semibold">Experience</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Research Intern</h3>
                    <h4 className="text-lg text-neutral-300">Blockchain Technologies</h4>
                    <p className="text-neutral-400 font-medium">IIIT Bhopal</p>
                  </div>

                  <ul className="space-y-3 text-neutral-400 text-sm list-none pl-0">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Conducted comparative overhead/power analyses of blockchain consensus protocols (BFT, DAG, PoS) for mobile devices.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Simulated latency scalability against network sizes to evaluate performance under strict 5G low-latency data constraints.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Authored and formatted research paper in strict compliance with IEEE conference standards.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-red-950/30 flex justify-between items-center text-sm">
                  <span className="text-red-500 font-semibold font-mono bg-red-950/30 px-3 py-1 rounded-full">Academic Research</span>
                  <span className="text-neutral-500 font-medium">Oct 2025 - Jan 2026</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-wide text-white">
                Featured <span className="text-red-500">Projects</span>
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                Decentralized architectures, high-performance engines, and parsing algorithms.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "RadiantFund",
                  subtitle: "Decentralized Crowdfunding Platform",
                  description: "Authored secure Solidity smart contracts managing decentralized escrow. Deployed off-chain metadata layer using Pinata IPFS to cut transaction gas costs by 40%. Designed real-time event listener using Ethers.js.",
                  tech: ["Solidity", "Hardhat", "Ethers.js", "IPFS", "Next.js"],
                  github: "https://github.com/divyanshu978",
                  live: "https://decentralized-crowdfunding-six.vercel.app/",
                  image: "/radiantfund.png"
                },
                {
                  title: "Accessibility Analyzer",
                  subtitle: "Automated WCAG Compliance Engine",
                  description: "Architected Node/Express backend auditing HTML codebases concurrently in < 15s via Puppeteer & axe-core. Integrated Supabase DB with RLS policies, Nginx reverse proxy, and Jenkins CI/CD.",
                  tech: ["Node.js", "Express", "Supabase", "Puppeteer", "Docker", "Jenkins"],
                  github: "https://github.com/divyanshu978/Analyser",
                  live: "https://analyser-red.vercel.app/",
                  image: "/image.png"
                },
                {
                  title: "CodeMap",
                  subtitle: "AST Dependency Graph Parser",
                  description: "Designed a structural parser extracting logical references across 10+ complex code modules into structured JSON. Implemented topological sorting algorithms to resolve circular dependencies.",
                  tech: ["Node.js", "Cytoscape.js", "AST Parser", "JavaScript", "Algorithms"],
                  github: "https://github.com/divyanshu978",
                  live: null,
                  // image: "/modern-cms-dashboard.png"
                }
              ].map((project, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  className="glass-effect rounded-3xl overflow-hidden border border-red-950/20 shadow-red-glow-hover flex flex-col justify-between h-full transition-all duration-500"
                >
                  <div className="space-y-4">
                    <div className="h-44 bg-neutral-900 overflow-hidden relative border-b border-red-950/20">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover filter brightness-[0.75] contrast-105 hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-600/90 text-white border-none font-mono text-xs uppercase px-3 py-1">
                          {project.title === "RadiantFund" ? "Web3" : "Full Stack"}
                        </Badge>
                      </div>
                    </div>

                    <div className="px-6 py-2 space-y-2">
                      <h3 className="text-xl font-bold text-white tracking-wide">{project.title}</h3>
                      <h4 className="text-xs text-red-500 font-mono tracking-wider">{project.subtitle}</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed pt-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-[10px] uppercase font-semibold font-mono tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 px-3 rounded-xl border border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white hover:border-red-500 hover:bg-red-950/10 transition-colors duration-300 flex items-center justify-center gap-1.5"
                      >
                        <Github className="h-4 w-4" /> Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors duration-300"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-wide text-white">
                Technical <span className="text-red-500">Skills</span>
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                Languages, libraries, database architectures, and DevOps deployment tools.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Web3 & Blockchain",
                  skills: ["Solidity", "EVM", "Hardhat", "Ethers.js", "Wagmi", "Pinata IPFS"],
                  icon: <Cpu className="h-6 w-6 text-red-500" />
                },
                {
                  title: "Backend Development",
                  skills: ["Node.js", "Express.js", "RESTful APIs", "WebSockets", "Distributed Systems"],
                  icon: <Server className="h-6 w-6 text-red-500" />
                },
                {
                  title: "Databases & Caching",
                  skills: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Redis (Session/Cache)"],
                  icon: <Database className="h-6 w-6 text-red-500" />
                },
                {
                  title: "DevOps & Tools",
                  skills: ["Docker", "Git", "Postman", "Nginx", "Jenkins CI/CD", "Linux Admin"],
                  icon: <Layers className="h-6 w-6 text-red-500" />
                },
                {
                  title: "Languages",
                  skills: ["C++", "C", "Solidity", "JavaScript", "TypeScript", "SQL"],
                  icon: <Code className="h-6 w-6 text-red-500" />
                },
                {
                  title: "Frontend (Supporting)",
                  skills: ["React.js", "Next.js", "Tailwind CSS", "Redux", "Cytoscape.js"],
                  icon: <Globe className="h-6 w-6 text-red-500" />
                }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect rounded-2xl p-6 border border-red-950/20 shadow-red-glow-hover transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {category.icon}
                    <h3 className="font-bold text-white text-base md:text-lg tracking-wide">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs text-neutral-300 bg-neutral-950 border border-neutral-800 hover:border-red-500/40 px-2.5 py-1 rounded transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="scroll-mt-24">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-wide text-white">
                Personal <span className="text-red-500">Achievements</span>
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                Recognitions, ratings, and problem-solving benchmarks.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Competitive Programming",
                  details: "Solved 300+ Data Structures & Algorithms problems on LeetCode. Achieved a 3-Star rating on CodeChef.",
                  metric: "300+ Solved",
                  badge: "3-Star CodeChef"
                },
                {
                  title: "Smart India Hackathon 2025",
                  details: "Led the architectural and system design pitch for a government problem statement, successfully defending decentralized backend scalability metrics to evaluation committees.",
                  metric: "Project Lead",
                  badge: "SIH Finalist"
                },
                {
                  title: "Academic Portfolios",
                  details: "Developed and deployed custom portfolio websites for 3 university professors, improving academic profile visibility and research presentation efficiency.",
                  metric: "3 Deployments",
                  badge: "Freelance Academic"
                }
              ].map((achievement, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="glass-effect rounded-3xl p-8 border border-red-950/20 shadow-red-glow-hover transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <Award className="h-8 w-8 text-red-500" />
                      <span className="text-xs uppercase tracking-widest font-bold font-mono text-red-500 bg-red-950/40 px-3 py-1 rounded-full border border-red-500/20">
                        {achievement.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {achievement.details}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-red-950/30 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Scope</span>
                    <span className="text-sm font-bold text-white font-mono">{achievement.metric}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-wide text-white">
                Get In <span className="text-red-500">Touch</span>
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                Feel free to reach out for research collaborations, project opportunities, or general inquiries.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              
              {/* Direct Info */}
              <div className="md:col-span-5 space-y-6">
                <div className="glass-effect rounded-3xl p-8 border border-red-950/20 space-y-6">
                  <h3 className="text-xl font-bold text-white">Contact Information</h3>
                  
                  <div className="space-y-4">
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Email</p>
                        <a href="mailto:divyanshuuttam978@gmail.com" className="text-sm text-neutral-300 hover:text-red-500 transition-colors font-medium">
                          divyanshuuttam978@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Phone</p>
                        <a href="tel:+917518645230" className="text-sm text-neutral-300 hover:text-red-500 transition-colors font-medium">
                          +91 7518645230
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Location</p>
                        <span className="text-sm text-neutral-300 font-medium">Bhopal, India</span>
                      </div>
                    </div>

                  </div>

                  <div className="pt-6 border-t border-red-950/20 flex gap-4">
                    <a
                      href="https://www.linkedin.com/in/divyanshu-uttam-87391423b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-800 flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <Linkedin className="h-4 w-4 text-red-500" /> LinkedIn
                    </a>
                    <a
                      href="https://github.com/divyanshu978"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-800 flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <Github className="h-4 w-4 text-red-500" /> GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-7">
                <div className="glass-effect rounded-3xl p-8 border border-red-950/20">
                  <form onSubmit={handleSubmitcontact} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-neutral-400">Your Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/50 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none transition-colors duration-300"
                          placeholder="Divyanshu"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-400">Your Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          // onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/50 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none transition-colors duration-300"
                          placeholder="divyanshu@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-neutral-400">Your Message</label>
                      <textarea
                        id="message"
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        // onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/50 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Hi Divyanshu, love your blockchain research..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-red-glow transition-all duration-300"
                    >
                      <Send className="h-4 w-4" /> Send Message
                    </Button>

                    <AnimatePresence>
                      {formSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-center text-sm text-red-400 font-medium"
                        >
                          Thanks! Message sent successfully. I will get back to you soon.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Modern Footer */}
      <footer className="border-t border-red-950/30 bg-neutral-950 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-neutral-500 text-sm">
          <p>© 2026 Divyanshu Uttam. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/divyanshu-uttam-87391423b/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">LinkedIn</a>
            <a href="https://github.com/divyanshu978" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">GitHub</a>
            <a href="mailto:divyanshuuttam978@gmail.com" className="hover:text-red-500 transition-colors">Email</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
