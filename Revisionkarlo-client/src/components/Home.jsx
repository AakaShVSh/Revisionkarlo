




// // src/components/Home.jsx
// import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
// import {
//   FaYoutube, FaTelegram, FaInstagram, FaWhatsapp,
//   FaBook, FaCalculator, FaBrain, FaGlobe,
//   FaBookmark, FaFacebook, FaChalkboardTeacher,
//   FaTrophy, FaUsers, FaClipboardList, FaStar,
//   FaCheckCircle, FaArrowRight, FaBolt, FaShieldAlt,
//   FaMedal, FaClock, FaPlay, FaFire, FaGraduationCap,
//   FaChartLine, FaLightbulb, FaAward,
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Slideshow from "./Slideshow";
// import { useRef, useState, useEffect } from "react";
// import AdsterraBanner from "./AdsterraBanner";
// import FloatingVideoAd from "./FloatingVideoAd";
// // import { useApp } from "../context/AppContext";

// /* ── Google Fonts injected once ─────────────────────────────────────────── */
// const FONT_LINK = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
// `;

// /* ── Animated counter ───────────────────────────────────────────────────── */
// const useCounter = (target, duration = 2200, active = false) => {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!active) return;
//     let start = null;
//     const tick = (ts) => {
//       if (!start) start = ts;
//       const p = Math.min((ts - start) / duration, 1);
//       const ease = 1 - Math.pow(1 - p, 3);
//       setVal(Math.floor(ease * target));
//       if (p < 1) requestAnimationFrame(tick);
//     };
//     requestAnimationFrame(tick);
//   }, [target, duration, active]);
//   return val;
// };

// /* ── Pill label ─────────────────────────────────────────────────────────── */
// const Pill = ({ children, color = "#2563eb" }) => (
//   <Box
//     display="inline-flex" alignItems="center"
//     bg={`${color}14`} color={color}
//     px={4} py={1} borderRadius="full"
//     fontSize="12px" fontWeight="700"
//     letterSpacing="1.5px" textTransform="uppercase"
//     border={`1px solid ${color}28`} mb={5}
//   >
//     {children}
//   </Box>
// );

// /* ── Section wrapper ────────────────────────────────────────────────────── */
// const Section = ({ children, bg = "white", py = { base: 16, md: 24 }, ...rest }) => (
//   <Box bg={bg} py={py} px={{ base: 4, md: 8 }} {...rest}>
//     <Box maxW="1160px" mx="auto">{children}</Box>
//   </Box>
// );

// /* ── Section title ──────────────────────────────────────────────────────── */
// const SectionTitle = ({ pill, title, italic, sub, center = true }) => (
//   <Box textAlign={center ? "center" : "left"} mb={{ base: 12, md: 16 }}>
//     {pill && <Pill>{pill}</Pill>}
//     <Text
//       fontFamily="'Instrument Serif', serif"
//       fontSize={{ base: "32px", md: "46px", lg: "54px" }}
//       fontWeight="400" color="#0f172a" lineHeight="1.15" mb={3}
//     >
//       {title}{" "}
//       {italic && (
//         <Text as="span" fontStyle="italic" color="#2563eb">{italic}</Text>
//       )}
//     </Text>
//     {sub && (
//       <Text
//         fontSize={{ base: "15px", md: "17px" }} color="#64748b"
//         maxW="560px" mx={center ? "auto" : "0"} lineHeight="1.8"
//         fontFamily="'Plus Jakarta Sans', sans-serif"
//       >
//         {sub}
//       </Text>
//     )}
//   </Box>
// );

// /* ═══════════════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════ */
// const Home = () => {
//   const navigate      = useNavigate();
//   const subjectsRef   = useRef(null);
//   const statsRef      = useRef(null);
//   const [loading, setLoading]         = useState(true);
//   const [statsOn, setStatsOn]         = useState(false);
//   // const { setSubject } = useApp();

//   useEffect(() => {
//     const t = setTimeout(() => setLoading(false), 900);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     if (!statsRef.current) return;
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.25 });
//     obs.observe(statsRef.current);
//     return () => obs.disconnect();
//   }, [loading]);

//   const n1 = useCounter(50000, 2200, statsOn);
//   const n2 = useCounter(1200,  2000, statsOn);
//   const n3 = useCounter(98,    1800, statsOn);
//   const n4 = useCounter(500,   2000, statsOn);

//   const setsub = (s) => { setSubject(s); navigate("/questionList"); };
//   const scrollToSubjects = () => subjectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

//   /* ── Loading screen ─────────────────────────────────────────────────── */
//   if (loading) {
//     return (
//       <Box minH="100vh" display="flex" alignItems="center" justifyContent="center"
//         bg="linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)">
//         <style>{FONT_LINK}</style>
//         <Flex direction="column" align="center" gap={5}>
//           <Box position="relative">
//             <Spinner thickness="3px" speed="0.8s" emptyColor="rgba(255,255,255,0.1)"
//               color="#3b82f6" size="xl" w="72px" h="72px" />
//             <Box position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
//               <FaGraduationCap size={28} color="#60a5fa" />
//             </Box>
//           </Box>
//           <Text fontFamily="'Instrument Serif',serif" fontSize="28px" color="white" letterSpacing="0.3px">
//             Revision Karlo
//           </Text>
//           <Text fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="13px" color="#94a3b8">
//             Loading your prep platform...
//           </Text>
//         </Flex>
//       </Box>
//     );
//   }

//   /* ── Subject cards data ─────────────────────────────────────────────── */
//   const subjects = [
//     { label: "Vocabulary",      key: "vocabulary", icon: <FaBook />,       accent: "#2563eb", bg: "linear-gradient(135deg,#1d4ed8,#2563eb)" },
//     { label: "English",         key: "english",    icon: <FaBook />,       accent: "#0891b2", bg: "linear-gradient(135deg,#0e7490,#0891b2)" },
//     { label: "General Studies", key: "gs",         icon: <FaGlobe />,      accent: "#ea580c", bg: "linear-gradient(135deg,#c2410c,#ea580c)" },
//     { label: "Reasoning",       key: "reasoning",  icon: <FaBrain />,      accent: "#16a34a", bg: "linear-gradient(135deg,#15803d,#16a34a)" },
//     { label: "Maths",           key: "math",       icon: <FaCalculator />, accent: "#0d9488", bg: "linear-gradient(135deg,#0f766e,#0d9488)" },
//   ];

//   const stats = [
//     { icon: <FaUsers />,       val: n1.toLocaleString() + "+", label: "Active Students",    note: "Across India" },
//     { icon: <FaClipboardList />, val: n2.toLocaleString() + "+", label: "Questions Bank",   note: "Expert Curated" },
//     { icon: <FaStar />,         val: n3 + "%",                   label: "Satisfaction Rate", note: "Student Rated" },
//     { icon: <FaFire />,         val: n4 + "+",                   label: "Mock Tests Taken",  note: "This Month" },
//   ];

//   const features = [
//     { icon: <FaBolt />,            title: "100% Free Forever",         desc: "No subscription. No hidden charges. Every question, every test — completely free.", color: "#f59e0b" },
//     { icon: <FaClipboardList />,   title: "1200+ Expert Questions",     desc: "Curated by experienced teachers following the latest exam patterns and syllabus.", color: "#2563eb" },
//     { icon: <FaClock />,           title: "Real Exam Environment",      desc: "Timed tests with auto-submit, instant scoring, and detailed performance reports.", color: "#10b981" },
//     { icon: <FaChartLine />,       title: "Track Your Progress",        desc: "Subject-wise analytics, rank tracking, and personalized improvement suggestions.", color: "#8b5cf6" },
//     { icon: <FaShieldAlt />,       title: "Anti-Cheat System",          desc: "Secure testing environment — copy disabled, shortcut blocked, results verified.", color: "#ef4444" },
//     { icon: <FaChalkboardTeacher />, title: "Coaching Integration",     desc: "Coaching centers can host private mock tests for their own batches on our platform.", color: "#06b6d4" },
//   ];

//   const steps = [
//     { n: "01", icon: <FaUsers size={22} />,       title: "Create Free Account",   desc: "Sign up in 30 seconds with your email. No credit card needed.",   color: "#2563eb" },
//     { n: "02", icon: <FaLightbulb size={22} />,   title: "Choose Your Exam",      desc: "Pick SSC, UPSC, Banking or any other exam and start practicing.", color: "#f59e0b" },
//     { n: "03", icon: <FaTrophy size={22} />,       title: "Practice & Rank Up",    desc: "Take timed tests, see detailed solutions, climb the leaderboard.", color: "#10b981" },
//   ];

//   const testimonials = [
//     { name: "Rahul Sharma",  tag: "SSC CGL 2024 ✓",    color: "#2563eb", init: "RS", text: "Revision Karlo ke daily mock tests ne meri speed aur accuracy dono doubly improve ki. English section mein sabse zyada help mili." },
//     { name: "Priya Verma",   tag: "UPSC Prelims 2024 ✓", color: "#10b981", init: "PV", text: "GS section itna comprehensive hai. Explanation ke saath answers milte hain — concepts ek baar mein clear ho jaate hain." },
//     { name: "Amit Kumar",    tag: "Bank PO Selected ✓",  color: "#f59e0b", init: "AK", text: "Maths ke tiered difficulty levels — easy se hard — ne mujhe systematically improve karne mein bohot help ki." },
//   ];

//   const socials = [
//     { icon: <FaYoutube size={22} />,   label: "YouTube",   sub: "Video Lectures",  bg: "#FF0000", glow: "rgba(255,0,0,0.25)" },
//     { icon: <FaTelegram size={22} />,  label: "Telegram",  sub: "Daily Updates",   bg: "#0088cc", glow: "rgba(0,136,204,0.25)" },
//     { icon: <FaInstagram size={22} />, label: "Instagram", sub: "Tips & Tricks",   bg: "#E4405F", glow: "rgba(228,64,95,0.25)" },
//     { icon: <FaFacebook size={22} />,  label: "Facebook",  sub: "Study Community", bg: "#1877F2", glow: "rgba(24,119,242,0.25)" },
//     { icon: <FaWhatsapp size={22} />,  label: "WhatsApp",  sub: "Direct Support",  bg: "#25D366", glow: "rgba(37,211,102,0.25)",
//       onClick: () => window.open("https://api.whatsapp.com/send?phone=919696306817&text=Hi!%20want%20help.", "_blank") },
//   ];

//   /* ───────────────────────────────────────────────────────── */
//   return (
//     <Box fontFamily="'Plus Jakarta Sans', sans-serif">
//       <style>{`
//         ${FONT_LINK}
//         @keyframes floatUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
//         @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
//         .subject-card:hover .subject-arrow { transform: translateX(4px); opacity:1; }
//         .subject-arrow { opacity:0; transition: all 0.2s; }
//         .reveal { animation: floatUp 0.6s ease both; }
//       `}</style>

//       {/* ══════════════════════════════════════
//           HERO — existing Slideshow
//       ══════════════════════════════════════ */}
//       <Slideshow scrollToSubjects={scrollToSubjects} />

//       {/* ══════════════════════════════════════
//           TRUST BAR
//       ══════════════════════════════════════ */}
//       <Box bg="#0f172a" py={4} px={{ base: 4, md: 8 }} overflow="hidden">
//         <Flex maxW="1160px" mx="auto" justify="center" align="center" gap={{ base: 6, md: 12 }} flexWrap="wrap">
//           {["50,000+ Students Registered", "Free Forever • No Credit Card", "Trusted by Top Coaching Centers", "1200+ Exam-Ready Questions"].map((t) => (
//             <Flex key={t} align="center" gap={2}>
//               <FaCheckCircle size={13} color="#22c55e" />
//               <Text fontSize={{ base: "12px", md: "13px" }} color="#cbd5e1" fontWeight="600" whiteSpace="nowrap">{t}</Text>
//             </Flex>
//           ))}
//         </Flex>
//       </Box>

//       {/* ══════════════════════════════════════
//           STATS
//       ══════════════════════════════════════ */}
//       <Box ref={statsRef} bg="white" py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }}
//         borderTop="1px solid #e2e8f0" borderBottom="1px solid #e2e8f0">
//         <Box maxW="1160px" mx="auto">
//           <Box
//             display="grid"
//             gridTemplateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
//             gap={{ base: 8, md: 0 }}
//           >
//             {[
//               { icon: <FaUsers />,         val: n1.toLocaleString() + "+", label: "Students Registered", note: "Across India",   color: "#2563eb" },
//               { icon: <FaClipboardList />, val: n2.toLocaleString() + "+", label: "Questions Available", note: "Expert Curated", color: "#16a34a" },
//               { icon: <FaStar />,          val: n3 + "%",                   label: "Satisfaction Rate",  note: "Student Rated",  color: "#f59e0b" },
//               { icon: <FaFire />,          val: n4 + "+",                   label: "Mock Tests Taken",   note: "This Month",     color: "#ef4444" },
//             ].map(({ icon, val, label, note, color }, i) => (
//               <Box
//                 key={label}
//                 textAlign="center"
//                 px={{ base: 4, md: 8 }} py={{ base: 2, md: 4 }}
//                 borderRight={{ md: i < 3 ? "1px solid #e2e8f0" : "none" }}
//               >
//                 <Flex justify="center" mb={4}>
//                   <Flex
//                     w="54px" h="54px" bg={`${color}12`}
//                     borderRadius="16px" align="center" justify="center"
//                     color={color} fontSize="22px"
//                   >
//                     {icon}
//                   </Flex>
//                 </Flex>
//                 <Text
//                   fontSize={{ base: "34px", md: "42px" }} fontWeight="800"
//                   color="#0f172a" lineHeight="1" mb={2} letterSpacing="-1px"
//                 >
//                   {val}
//                 </Text>
//                 <Text fontSize="14px" fontWeight="700" color="#334155" mb={1}>{label}</Text>
//                 <Text fontSize="12px" color="#94a3b8" fontWeight="500">{note}</Text>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>

//       {/* ══════════════════════════════════════
//           SUBJECTS
//       ══════════════════════════════════════ */}
//       <Section bg="#f8fafc" ref={subjectsRef}>
//         <SectionTitle
//           pill="Subjects"
//           title="Start Preparing"
//           italic="Right Now"
//           sub="SSC, UPSC, Banking aur baaki competitive exams ke liye comprehensive question banks — expert teachers dwara curated."
//         />

//         <Box
//           display="grid"
//           gridTemplateColumns={{ base: "repeat(2,1fr)", md: "repeat(3,1fr)", lg: "repeat(4,1fr)" }}
//           gap={{ base: 4, md: 5 }}
//         >
//           {subjects.map(({ label, key, icon, accent, bg }, idx) => (
//             <Box
//               key={key}
//               className="subject-card"
//               onClick={() => setsub(key)}
//               cursor="pointer"
//               bg="white"
//               borderRadius="20px"
//               border="1.5px solid #e2e8f0"
//               p={6}
//               style={{ animationDelay: `${idx * 0.07}s` }}
//               _hover={{
//                 transform: "translateY(-6px)",
//                 boxShadow: `0 20px 40px ${accent}28`,
//                 borderColor: accent,
//               }}
//               transition="all 0.28s cubic-bezier(0.34,1.56,0.64,1)"
//               position="relative" overflow="hidden"
//             >
//               {/* Subtle top accent line */}
//               <Box position="absolute" top={0} left={0} right={0} h="3px" bg={bg} borderRadius="20px 20px 0 0" />

//               <Flex
//                 w="52px" h="52px" bg={`${accent}12`} borderRadius="16px"
//                 align="center" justify="center" color={accent} fontSize="22px" mb={4}
//               >
//                 {icon}
//               </Flex>
//               <Text fontSize="15px" fontWeight="700" color="#0f172a" mb={1}>{label}</Text>
//               <Flex align="center" gap={1} color={accent} fontSize="13px" fontWeight="600" className="subject-arrow">
//                 <Text>Practice Now</Text>
//                 <FaArrowRight size={10} />
//               </Flex>
//             </Box>
//           ))}

//           {/* Coaching */}
//           {/* <Link to="/coaching">
//             <Box
//               className="subject-card"
//               bg="white" borderRadius="20px" border="1.5px solid #e2e8f0" p={6}
//               cursor="pointer"
//               _hover={{ transform: "translateY(-6px)", boxShadow: "0 20px 40px rgba(234,88,12,0.18)", borderColor: "#ea580c" }}
//               transition="all 0.28s cubic-bezier(0.34,1.56,0.64,1)"
//               position="relative" overflow="hidden"
//             >
//               <Box position="absolute" top={0} left={0} right={0} h="3px" bg="linear-gradient(90deg,#f97316,#ea580c)" borderRadius="20px 20px 0 0" />
//               <Box position="absolute" top={3} right={3}>
//                 <Box bg="#ea580c" color="white" fontSize="9px" fontWeight="800" px={2} py={0.5} borderRadius="full" letterSpacing="0.5px">NEW</Box>
//               </Box>
//               <Flex w="52px" h="52px" bg="#ea580c12" borderRadius="16px" align="center" justify="center" color="#ea580c" fontSize="22px" mb={4}>
//                 <FaChalkboardTeacher />
//               </Flex>
//               <Text fontSize="15px" fontWeight="700" color="#0f172a" mb={1}>Coaching Tests</Text>
//               <Flex align="center" gap={1} color="#ea580c" fontSize="13px" fontWeight="600" className="subject-arrow">
//                 <Text>Explore</Text>
//                 <FaArrowRight size={10} />
//               </Flex>
//             </Box>
//           </Link> */}

//           {/* Saved */}
//           <Link to="/Saved-question">
//             <Box
//               className="subject-card"
//               bg="white" borderRadius="20px" border="1.5px solid #e2e8f0" p={6}
//               cursor="pointer"
//               _hover={{ transform: "translateY(-6px)", boxShadow: "0 20px 40px rgba(92,76,227,0.18)", borderColor: "#7c3aed" }}
//               transition="all 0.28s cubic-bezier(0.34,1.56,0.64,1)"
//               position="relative" overflow="hidden"
//             >
//               <Box position="absolute" top={0} left={0} right={0} h="3px" bg="linear-gradient(90deg,#7c3aed,#5244cc)" borderRadius="20px 20px 0 0" />
//               <Flex w="52px" h="52px" bg="#7c3aed12" borderRadius="16px" align="center" justify="center" color="#7c3aed" fontSize="22px" mb={4}>
//                 <FaBookmark />
//               </Flex>
//               <Text fontSize="15px" fontWeight="700" color="#0f172a" mb={1}>Saved Questions</Text>
//               <Flex align="center" gap={1} color="#7c3aed" fontSize="13px" fontWeight="600" className="subject-arrow">
//                 <Text>View All</Text>
//                 <FaArrowRight size={10} />
//               </Flex>
//             </Box>
//           </Link>
//         </Box>
//       </Section>

//       {/* ══════════════════════════════════════
//           HOW IT WORKS
//       ══════════════════════════════════════ */}
//       <Section bg="#0f172a">
//         <SectionTitle
//           pill="Process"
//           title="Shuru Karna"
//           italic="Bahut Aasaan Hai"
//           sub="Teen simple steps mein competitive exam preparation start karo — koi confusion nahi."
//         />

//         <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
//           {steps.map(({ n, icon, title, desc, color }, i) => (
//             <Box
//               key={n}
//               bg="rgba(255,255,255,0.04)"
//               border="1px solid rgba(255,255,255,0.08)"
//               borderRadius="24px" p={8}
//               position="relative" overflow="hidden"
//               _hover={{ bg: "rgba(255,255,255,0.07)", borderColor: `${color}60` }}
//               transition="all 0.3s"
//             >
//               {/* Large step number watermark */}
//               <Text
//                 position="absolute" bottom="-10px" right="16px"
//                 fontFamily="'Instrument Serif',serif"
//                 fontSize="100px" fontWeight="400"
//                 color="rgba(255,255,255,0.04)" lineHeight="1"
//                 userSelect="none"
//               >
//                 {n}
//               </Text>

//               <Flex
//                 w="56px" h="56px" bg={`${color}20`} borderRadius="18px"
//                 align="center" justify="center" color={color} mb={5}
//               >
//                 {icon}
//               </Flex>

//               <Box
//                 display="inline-block"
//                 bg={`${color}20`} color={color}
//                 px={3} py={0.5} borderRadius="full"
//                 fontSize="11px" fontWeight="800" letterSpacing="1px"
//                 mb={3}
//               >
//                 STEP {n}
//               </Box>

//               <Text fontSize="18px" fontWeight="800" color="white" mb={3} lineHeight="1.3">{title}</Text>
//               <Text fontSize="14px" color="#94a3b8" lineHeight="1.8">{desc}</Text>
//             </Box>
//           ))}
//         </Box>
//       </Section>

//       {/* ══════════════════════════════════════
//           WHY US — two column editorial
//       ══════════════════════════════════════ */}
//       <Section bg="white">
//         <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 14, lg: 20 }} alignItems="center">

//           {/* Left — text */}
//           <Box>
//             <Pill color="#2563eb">Why Revision Karlo?</Pill>
//             <Text
//               fontFamily="'Instrument Serif',serif"
//               fontSize={{ base: "34px", md: "48px" }}
//               color="#0f172a" lineHeight="1.15" mb={5}
//             >
//               India's Most <Text as="span" fontStyle="italic" color="#2563eb">Accessible</Text> Exam Prep Platform
//             </Text>
//             <Text fontSize="16px" color="#64748b" lineHeight="1.9" mb={8}>
//               Lakhs of students waste money on expensive coaching and subscription apps. Revision Karlo gives you the same quality practice — completely free, always.
//             </Text>
//             <Flex direction="column" gap={4}>
//               {[
//                 "Free access to 1200+ questions across all subjects",
//                 "Real exam-style timed tests with instant evaluation",
//                 "Detailed solutions and concept explanations",
//                 "Rank tracking and performance analytics",
//                 "Coaching center integration for private batches",
//               ].map((point) => (
//                 <Flex key={point} align="flex-start" gap={3}>
//                   <Box mt={1} flexShrink={0}>
//                     <Flex w="20px" h="20px" bg="#dcfce7" borderRadius="full" align="center" justify="center">
//                       <FaCheckCircle size={11} color="#16a34a" />
//                     </Flex>
//                   </Box>
//                   <Text fontSize="15px" color="#334155" fontWeight="500" lineHeight="1.6">{point}</Text>
//                 </Flex>
//               ))}
//             </Flex>
//           </Box>

//           {/* Right — feature cards 2×3 */}
//           <Box
//             display="grid"
//             gridTemplateColumns="repeat(2,1fr)"
//             gap={4}
//           >
//             {features.map(({ icon, title, desc, color }) => (
//               <Box
//                 key={title}
//                 bg="#f8fafc" borderRadius="20px" p={5}
//                 border="1px solid #e2e8f0"
//                 _hover={{ bg: "white", boxShadow: "0 8px 30px rgba(0,0,0,0.08)", transform: "translateY(-3px)", borderColor: color }}
//                 transition="all 0.25s"
//               >
//                 <Flex
//                   w="44px" h="44px" bg={`${color}12`} borderRadius="12px"
//                   align="center" justify="center" color={color} fontSize="18px" mb={4}
//                 >
//                   {icon}
//                 </Flex>
//                 <Text fontSize="14px" fontWeight="800" color="#0f172a" mb={2} lineHeight="1.3">{title}</Text>
//                 <Text fontSize="12px" color="#94a3b8" lineHeight="1.7">{desc}</Text>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Section>

//       {/* ══════════════════════════════════════
//           TESTIMONIALS
//       ══════════════════════════════════════ */}
//       <Section bg="#f8fafc">
//         <SectionTitle
//           pill="Testimonials"
//           title="Students Jo"
//           italic="Crack Kar Chuke Hain"
//           sub="Real students. Real results. Unhi ki baat jo yahan se padh ke exam pass kar chuke hain."
//         />
//         <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
//           {testimonials.map(({ name, tag, color, init, text }) => (
//             <Box
//               key={name}
//               bg="white" borderRadius="24px" p={7}
//               border="1px solid #e2e8f0"
//               boxShadow="0 2px 12px rgba(0,0,0,0.04)"
//               _hover={{ boxShadow: "0 16px 40px rgba(0,0,0,0.1)", transform: "translateY(-4px)" }}
//               transition="all 0.3s"
//               position="relative"
//             >
//               {/* Quote decoration */}
//               <Text
//                 position="absolute" top={4} right={6}
//                 fontFamily="'Instrument Serif',serif"
//                 fontSize="80px" color={`${color}15`} lineHeight="1"
//               >
//                 "
//               </Text>

//               <Flex mb={4} gap={1}>
//                 {[1,2,3,4,5].map((s) => <FaStar key={s} size={13} color="#f59e0b" />)}
//               </Flex>

//               <Text fontSize="14px" color="#475569" lineHeight="1.9" mb={6} fontStyle="italic">
//                 "{text}"
//               </Text>

//               <Box h="1px" bg="#f1f5f9" mb={5} />

//               <Flex align="center" gap={3}>
//                 <Flex
//                   w="44px" h="44px" borderRadius="full" flexShrink={0}
//                   bg={color} align="center" justify="center"
//                   fontSize="13px" fontWeight="800" color="white"
//                 >
//                   {init}
//                 </Flex>
//                 <Box>
//                   <Text fontSize="14px" fontWeight="800" color="#0f172a">{name}</Text>
//                   <Text fontSize="12px" color="#16a34a" fontWeight="700">{tag}</Text>
//                 </Box>
//               </Flex>
//             </Box>
//           ))}
//         </Box>
//       </Section>

//       {/* ══════════════════════════════════════
//           CTA
//       ══════════════════════════════════════ */}
//       <Box
//         bg="linear-gradient(135deg,#1e3a5f 0%,#0f172a 100%)"
//         py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }}
//         position="relative" overflow="hidden"
//       >
//         {/* Decorative circles */}
//         <Box position="absolute" top="-80px" right="-80px" w="320px" h="320px" borderRadius="full"
//           bg="rgba(59,130,246,0.06)" />
//         <Box position="absolute" bottom="-60px" left="-60px" w="240px" h="240px" borderRadius="full"
//           bg="rgba(16,185,129,0.06)" />

//         <Box maxW="680px" mx="auto" textAlign="center" position="relative">
//           <Box display="inline-block" bg="rgba(59,130,246,0.15)" color="#60a5fa"
//             px={4} py={1} borderRadius="full" fontSize="12px" fontWeight="700"
//             letterSpacing="1.5px" textTransform="uppercase" mb={6} border="1px solid rgba(59,130,246,0.25)">
//             Get Started Today
//           </Box>
//           <Text
//             fontFamily="'Instrument Serif',serif"
//             fontSize={{ base: "34px", md: "52px" }}
//             color="white" lineHeight="1.15" mb={5}
//           >
//             Aaj Se Hi Apni{" "}
//             <Text as="span" fontStyle="italic" color="#60a5fa">Preparation</Text>{" "}
//             Shuru Karo
//           </Text>
//           <Text fontSize={{ base: "15px", md: "17px" }} color="#94a3b8" mb={10} lineHeight="1.8">
//             50,000+ students pehle se yahan hain. Free join karo aur apna exam crack karo.
//           </Text>

//           <Flex justify="center" gap={4} flexWrap="wrap" mb={10}>
//             <Box
//               as={Link} to="/auth/signup"
//               display="inline-flex" alignItems="center" gap={2}
//               bg="#2563eb" color="white"
//               px={8} py={4} borderRadius="14px" fontWeight="700" fontSize="15px"
//               _hover={{ bg: "#1d4ed8", transform: "translateY(-2px)", boxShadow: "0 12px 28px rgba(37,99,235,0.4)" }}
//               transition="all 0.2s"
//             >
//               Free Mein Register Karo <FaArrowRight size={13} />
//             </Box>
//             <Box
//               as={Link} to="/questionList"
//               display="inline-flex" alignItems="center" gap={2}
//               bg="rgba(255,255,255,0.08)" color="white"
//               px={8} py={4} borderRadius="14px" fontWeight="600" fontSize="15px"
//               border="1px solid rgba(255,255,255,0.15)"
//               _hover={{ bg: "rgba(255,255,255,0.14)", transform: "translateY(-2px)" }}
//               transition="all 0.2s"
//             >
//               <FaPlay size={12} /> Pehle Try Karo
//             </Box>
//           </Flex>

//           <Flex justify="center" gap={8} flexWrap="wrap">
//             {["No Credit Card", "Instant Access", "Always Free"].map((b) => (
//               <Flex key={b} align="center" gap={2} color="#64748b">
//                 <FaCheckCircle size={13} color="#22c55e" />
//                 <Text fontSize="13px" fontWeight="600">{b}</Text>
//               </Flex>
//             ))}
//           </Flex>
//         </Box>
//       </Box>

//       {/* ══════════════════════════════════════
//           SOCIAL
//       ══════════════════════════════════════ */}
//       <Section bg="white">
//         <SectionTitle
//           pill="Community"
//           title="Hamare Saath"
//           italic="Judo"
//           sub="Latest study material, tips aur updates ke liye follow karo. 100k+ students already connected hain."
//         />
//         <Flex justify="center" flexWrap="wrap" gap={4}>
//           {socials.map(({ icon, label, sub, bg, glow, onClick }) => (
//             <Box
//               key={label} onClick={onClick}
//               cursor="pointer" textAlign="center"
//               bg="white" borderRadius="20px" p={6}
//               border="1.5px solid #e2e8f0"
//               w={{ base: "calc(50% - 8px)", sm: "160px" }}
//               _hover={{
//                 transform: "translateY(-6px)",
//                 boxShadow: `0 16px 32px ${glow}`,
//                 borderColor: bg,
//               }}
//               transition="all 0.28s cubic-bezier(0.34,1.56,0.64,1)"
//             >
//               <Flex
//                 w="52px" h="52px" borderRadius="16px" mx="auto"
//                 align="center" justify="center" color="white" mb={3}
//                 bg={bg} boxShadow={`0 6px 16px ${glow}`}
//               >
//                 {icon}
//               </Flex>
//               <Text fontSize="14px" fontWeight="800" color="#0f172a" mb={1}>{label}</Text>
//               <Text fontSize="12px" color="#94a3b8" fontWeight="500">{sub}</Text>
//             </Box>
//           ))}
//         </Flex>
//       </Section>

//       <Box w={{ base: "95%", md: "90%" }} maxW="1160px" mx="auto" pb={8}>
//         <AdsterraBanner />
//       </Box>
//       <FloatingVideoAd />
//     </Box>
//   );
// };

// export default Home;














// src/components/Home.jsx
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import {
  FaYoutube, FaTelegram, FaInstagram, FaWhatsapp,
  FaBook, FaCalculator, FaBrain, FaGlobe,
  FaBookmark, FaFacebook, FaChalkboardTeacher,
  FaTrophy, FaUsers, FaClipboardList, FaStar,
  FaCheckCircle, FaArrowRight, FaBolt, FaShieldAlt,
  FaMedal, FaClock, FaPlay, FaFire, FaGraduationCap,
  FaChartLine, FaLightbulb, FaAward,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Slideshow from "./Slideshow";
import { useRef, useState, useEffect } from "react";
import AdsterraBanner from "./AdsterraBanner";
import FloatingVideoAd from "./FloatingVideoAd";

/* ── Google Fonts injected once ─────────────────────────────────────────── */
const FONT_LINK = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
`;

/* ── Animated counter ───────────────────────────────────────────────────── */
const useCounter = (target, duration = 2200, active = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
};

/* ── Pill label ─────────────────────────────────────────────────────────── */
const Pill = ({ children, color = "#2563eb" }) => (
  <Box
    display="inline-flex" alignItems="center"
    bg={`${color}14`} color={color}
    px={4} py={1} borderRadius="full"
    fontSize="12px" fontWeight="700"
    letterSpacing="1.5px" textTransform="uppercase"
    border={`1px solid ${color}28`} mb={5}
  >
    {children}
  </Box>
);

/* ── Section wrapper ────────────────────────────────────────────────────── */
const Section = ({ children, bg = "white", py = { base: 16, md: 24 }, ...rest }) => (
  <Box bg={bg} py={py} px={{ base: 4, md: 8 }} {...rest}>
    <Box maxW="1160px" mx="auto">{children}</Box>
  </Box>
);

/* ── Section title ──────────────────────────────────────────────────────── */
const SectionTitle = ({ pill, title, italic, sub, center = true }) => (
  <Box textAlign={center ? "center" : "left"} mb={{ base: 12, md: 16 }}>
    {pill && <Pill>{pill}</Pill>}
    <Text
      fontFamily="'Instrument Serif', serif"
      fontSize={{ base: "32px", md: "46px", lg: "54px" }}
      fontWeight="400" color="#0f172a" lineHeight="1.15" mb={3}
    >
      {title}{" "}
      {italic && (
        <Text as="span" fontStyle="italic" color="#2563eb">{italic}</Text>
      )}
    </Text>
    {sub && (
      <Text
        fontSize={{ base: "15px", md: "17px" }} color="#64748b"
        maxW="560px" mx={center ? "auto" : "0"} lineHeight="1.8"
        fontFamily="'Plus Jakarta Sans', sans-serif"
      >
        {sub}
      </Text>
    )}
  </Box>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const Home = ({ setchoosesub }) => {
  const navigate      = useNavigate();
  const subjectsRef   = useRef(null);
  const statsRef      = useRef(null);
  const [loading, setLoading]         = useState(true);
  const [statsOn, setStatsOn]         = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.25 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [loading]);

  const n1 = useCounter(50000, 2200, statsOn);
  const n2 = useCounter(1200,  2000, statsOn);
  const n3 = useCounter(98,    1800, statsOn);
  const n4 = useCounter(500,   2000, statsOn);

  const setsub = (subject) => { 
    console.log("✅ Subject selected:", subject);
    setchoosesub(subject); 
    navigate("/questionList"); 
  };
  
  const scrollToSubjects = () => subjectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* ── Loading screen ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center"
        bg="linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)">
        <style>{FONT_LINK}</style>
        <Flex direction="column" align="center" gap={5}>
          <Box position="relative">
            <Spinner thickness="3px" speed="0.8s" emptyColor="rgba(255,255,255,0.1)"
              color="#3b82f6" size="xl" w="72px" h="72px" />
            <Box position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
              <FaGraduationCap size={28} color="#60a5fa" />
            </Box>
          </Box>
          <Text fontFamily="'Instrument Serif',serif" fontSize="28px" color="white" letterSpacing="0.3px">
            Revision Karlo
          </Text>
          <Text fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="13px" color="#94a3b8">
            Loading your prep platform...
          </Text>
        </Flex>
      </Box>
    );
  }

  /* ── Subject cards data ─────────────────────────────────────────────── */
  const subjects = [
    { label: "Vocabulary",      key: "vocabulary", icon: <FaBook />,       accent: "#2563eb", bg: "linear-gradient(135deg,#1d4ed8,#2563eb)" },
    { label: "English",         key: "english",    icon: <FaBook />,       accent: "#0891b2", bg: "linear-gradient(135deg,#0e7490,#0891b2)" },
    { label: "General Studies", key: "gs",         icon: <FaGlobe />,      accent: "#ea580c", bg: "linear-gradient(135deg,#c2410c,#ea580c)" },
    { label: "Reasoning",       key: "reasoning",  icon: <FaBrain />,      accent: "#16a34a", bg: "linear-gradient(135deg,#15803d,#16a34a)" },
    { label: "Maths",           key: "math",       icon: <FaCalculator />, accent: "#0d9488", bg: "linear-gradient(135deg,#0f766e,#0d9488)" },
  ];

  const socials = [
    { icon: <FaYoutube size={22} />,   label: "YouTube",   sub: "Video Lectures",  bg: "#FF0000", glow: "rgba(255,0,0,0.25)" },
    { icon: <FaTelegram size={22} />,  label: "Telegram",  sub: "Daily Updates",   bg: "#0088cc", glow: "rgba(0,136,204,0.25)" },
    { icon: <FaInstagram size={22} />, label: "Instagram", sub: "Tips & Tricks",   bg: "#E4405F", glow: "rgba(228,64,95,0.25)" },
    { icon: <FaFacebook size={22} />,  label: "Facebook",  sub: "Study Community", bg: "#1877F2", glow: "rgba(24,119,242,0.25)" },
    { icon: <FaWhatsapp size={22} />,  label: "WhatsApp",  sub: "Direct Support",  bg: "#25D366", glow: "rgba(37,211,102,0.25)",
      onClick: () => window.open("https://api.whatsapp.com/send?phone=919696306817&text=Hi!%20want%20help.", "_blank") },
  ];

  const features = [
    { icon: <FaBolt />,            title: "100% Free Forever",         desc: "No subscription. No hidden charges. Every question, every test — completely free.", color: "#f59e0b" },
    { icon: <FaClipboardList />,   title: "1200+ Expert Questions",     desc: "Curated by experienced teachers following the latest exam patterns and syllabus.", color: "#2563eb" },
    { icon: <FaClock />,           title: "Real Exam Environment",      desc: "Timed tests with auto-submit, instant scoring, and detailed performance reports.", color: "#10b981" },
    { icon: <FaChartLine />,       title: "Track Your Progress",        desc: "Subject-wise analytics, rank tracking, and personalized improvement suggestions.", color: "#8b5cf6" },
    { icon: <FaShieldAlt />,       title: "Anti-Cheat System",          desc: "Secure testing environment — copy disabled, shortcut blocked, results verified.", color: "#ef4444" },
    { icon: <FaChalkboardTeacher />, title: "Coaching Integration",     desc: "Coaching centers can host private mock tests for their own batches on our platform.", color: "#06b6d4" },
  ];

  const steps = [
    { n: "01", icon: <FaUsers size={22} />,       title: "Create Free Account",   desc: "Sign up in 30 seconds with your email. No credit card needed.",   color: "#2563eb" },
    { n: "02", icon: <FaLightbulb size={22} />,   title: "Choose Your Exam",      desc: "Pick SSC, UPSC, Banking or any other exam and start practicing.", color: "#f59e0b" },
    { n: "03", icon: <FaTrophy size={22} />,       title: "Practice & Rank Up",    desc: "Take timed tests, see detailed solutions, climb the leaderboard.", color: "#10b981" },
  ];

  const testimonials = [
    { name: "Rahul Sharma",  tag: "SSC CGL 2024 ✓",    color: "#2563eb", init: "RS", text: "Revision Karlo ke daily mock tests ne meri speed aur accuracy dono doubly improve ki. English section mein sabse zyada help mili." },
    { name: "Priya Verma",   tag: "UPSC Prelims 2024 ✓", color: "#10b981", init: "PV", text: "GS section itna comprehensive hai. Explanation ke saath answers milte hain — concepts ek baar mein clear ho jaate hain." },
    { name: "Amit Kumar",    tag: "Bank PO Selected ✓",  color: "#f59e0b", init: "AK", text: "Maths ke tiered difficulty levels — easy se hard — ne mujhe systematically improve karne mein bohot help ki." },
  ];

  /* ───────────────────────────────────────────────────────── */
  return (
    <Box fontFamily="'Plus Jakarta Sans', sans-serif">
      <style>{`
        ${FONT_LINK}
        @keyframes floatUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .subject-card:hover .subject-arrow { transform: translateX(4px); opacity:1; }
        .subject-arrow { opacity:0; transition: all 0.2s; }
        .reveal { animation: floatUp 0.6s ease both; }
      `}</style>

      {/* ══════════════════════════════════════
          HERO — existing Slideshow
      ══════════════════════════════════════ */}
      <Slideshow scrollToSubjects={scrollToSubjects} />

      {/* ══════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════ */}
      <Box bg="#0f172a" py={4} px={{ base: 4, md: 8 }} overflow="hidden">
        <Flex maxW="1160px" mx="auto" justify="center" align="center" gap={{ base: 6, md: 12 }} flexWrap="wrap">
          {["50,000+ Students Registered", "Free Forever • No Credit Card", "Trusted by Top Coaching Centers", "1200+ Exam-Ready Questions"].map((t) => (
            <Flex key={t} align="center" gap={2}>
              <FaCheckCircle size={13} color="#22c55e" />
              <Text fontSize={{ base: "12px", md: "13px" }} color="#cbd5e1" fontWeight="600" whiteSpace="nowrap">{t}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <Box ref={statsRef} bg="white" py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }}
        borderTop="1px solid #e2e8f0" borderBottom="1px solid #e2e8f0">
        <Box maxW="1160px" mx="auto">
          <Box
            display="grid"
            gridTemplateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
            gap={{ base: 8, md: 0 }}
          >
            {[
              { icon: <FaUsers />,         val: n1.toLocaleString() + "+", label: "Students Registered", note: "Across India",   color: "#2563eb" },
              { icon: <FaClipboardList />, val: n2.toLocaleString() + "+", label: "Questions Available", note: "Expert Curated", color: "#16a34a" },
              { icon: <FaStar />,          val: n3 + "%",                   label: "Satisfaction Rate",  note: "Student Rated",  color: "#f59e0b" },
              { icon: <FaFire />,          val: n4 + "+",                   label: "Mock Tests Taken",   note: "This Month",     color: "#ef4444" },
            ].map(({ icon, val, label, note, color }, i) => (
              <Box
                key={label}
                textAlign="center"
                px={{ base: 4, md: 8 }} py={{ base: 2, md: 4 }}
                borderRight={{ md: i < 3 ? "1px solid #e2e8f0" : "none" }}
              >
                <Flex justify="center" mb={4}>
                  <Flex
                    w="54px" h="54px" bg={`${color}12`}
                    borderRadius="16px" align="center" justify="center"
                    color={color} fontSize="22px"
                  >
                    {icon}
                  </Flex>
                </Flex>
                <Text
                  fontSize={{ base: "34px", md: "42px" }} fontWeight="800"
                  color="#0f172a" lineHeight="1" mb={2} letterSpacing="-1px"
                >
                  {val}
                </Text>
                <Text fontSize="14px" fontWeight="700" color="#334155" mb={1}>{label}</Text>
                <Text fontSize="12px" color="#94a3b8" fontWeight="500">{note}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ══════════════════════════════════════
          SUBJECTS
      ══════════════════════════════════════ */}
      <Section bg="#f8fafc" ref={subjectsRef}>
        <SectionTitle
          pill="Subjects"
          title="Start Preparing"
          italic="Right Now"
          sub="SSC, UPSC, Banking aur baaki competitive exams ke liye comprehensive question banks — expert teachers dwara curated."
        />

        <Box
          display="grid"
          gridTemplateColumns={{ base: "repeat(2,1fr)", md: "repeat(3,1fr)", lg: "repeat(4,1fr)" }}
          gap={{ base: 4, md: 5 }}
        >
          {subjects.map(({ label, key, icon, accent, bg }, idx) => (
            <Box
              key={key}
              className="subject-card"
              onClick={() => setsub(key)}
              cursor="pointer"
              bg="white"
              borderRadius="20px"
              border="1.5px solid #e2e8f0"
              p={6}
              style={{ animationDelay: `${idx * 0.07}s` }}
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: `0 20px 40px ${accent}28`,
                borderColor: accent,
              }}
              transition="all 0.28s cubic-bezier(0.34,1.56,0.64,1)"
              position="relative" overflow="hidden"
            >
              <Box position="absolute" top={0} left={0} right={0} h="3px" bg={bg} borderRadius="20px 20px 0 0" />
              <Flex
                w="52px" h="52px" bg={`${accent}12`} borderRadius="16px"
                align="center" justify="center" color={accent} fontSize="22px" mb={4}
              >
                {icon}
              </Flex>
              <Text fontSize="15px" fontWeight="700" color="#0f172a" mb={1}>{label}</Text>
              <Flex align="center" gap={1} color={accent} fontSize="13px" fontWeight="600" className="subject-arrow">
                <Text>Practice Now</Text>
                <FaArrowRight size={10} />
              </Flex>
            </Box>
          ))}

          {/* Saved */}
          <Link to="/Saved-question">
            <Box
              className="subject-card"
              bg="white" borderRadius="20px" border="1.5px solid #e2e8f0" p={6}
              cursor="pointer"
              _hover={{ transform: "translateY(-6px)", boxShadow: "0 20px 40px rgba(92,76,227,0.18)", borderColor: "#7c3aed" }}
              transition="all 0.28s cubic-bezier(0.34,1.56,0.64,1)"
              position="relative" overflow="hidden"
            >
              <Box position="absolute" top={0} left={0} right={0} h="3px" bg="linear-gradient(90deg,#7c3aed,#5244cc)" borderRadius="20px 20px 0 0" />
              <Flex w="52px" h="52px" bg="#7c3aed12" borderRadius="16px" align="center" justify="center" color="#7c3aed" fontSize="22px" mb={4}>
                <FaBookmark />
              </Flex>
              <Text fontSize="15px" fontWeight="700" color="#0f172a" mb={1}>Saved Questions</Text>
              <Flex align="center" gap={1} color="#7c3aed" fontSize="13px" fontWeight="600" className="subject-arrow">
                <Text>View All</Text>
                <FaArrowRight size={10} />
              </Flex>
            </Box>
          </Link>
        </Box>
      </Section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <Section bg="#0f172a">
        <SectionTitle
          pill="Process"
          title="Shuru Karna"
          italic="Bahut Aasaan Hai"
          sub="Teen simple steps mein competitive exam preparation start karo — koi confusion nahi."
        />

        <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
          {steps.map(({ n, icon, title, desc, color }, i) => (
            <Box
              key={n}
              bg="rgba(255,255,255,0.04)"
              border="1px solid rgba(255,255,255,0.08)"
              borderRadius="24px" p={8}
              position="relative" overflow="hidden"
              _hover={{ bg: "rgba(255,255,255,0.07)", borderColor: `${color}60` }}
              transition="all 0.3s"
            >
              <Text
                position="absolute" bottom="-10px" right="16px"
                fontFamily="'Instrument Serif',serif"
                fontSize="100px" fontWeight="400"
                color="rgba(255,255,255,0.04)" lineHeight="1"
                userSelect="none"
              >
                {n}
              </Text>

              <Flex
                w="56px" h="56px" bg={`${color}20`} borderRadius="18px"
                align="center" justify="center" color={color} mb={5}
              >
                {icon}
              </Flex>

              <Box
                display="inline-block"
                bg={`${color}20`} color={color}
                px={3} py={0.5} borderRadius="full"
                fontSize="11px" fontWeight="800" letterSpacing="1px"
                mb={3}
              >
                STEP {n}
              </Box>

              <Text fontSize="18px" fontWeight="800" color="white" mb={3} lineHeight="1.3">{title}</Text>
              <Text fontSize="14px" color="#94a3b8" lineHeight="1.8">{desc}</Text>
            </Box>
          ))}
        </Box>
      </Section>

      {/* ══════════════════════════════════════
          WHY US
      ══════════════════════════════════════ */}
      <Section bg="white">
        <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 14, lg: 20 }} alignItems="center">
          <Box>
            <Pill color="#2563eb">Why Revision Karlo?</Pill>
            <Text
              fontFamily="'Instrument Serif',serif"
              fontSize={{ base: "34px", md: "48px" }}
              color="#0f172a" lineHeight="1.15" mb={5}
            >
              India's Most <Text as="span" fontStyle="italic" color="#2563eb">Accessible</Text> Exam Prep Platform
            </Text>
            <Text fontSize="16px" color="#64748b" lineHeight="1.9" mb={8}>
              Lakhs of students waste money on expensive coaching and subscription apps. Revision Karlo gives you the same quality practice — completely free, always.
            </Text>
            <Flex direction="column" gap={4}>
              {[
                "Free access to 1200+ questions across all subjects",
                "Real exam-style timed tests with instant evaluation",
                "Detailed solutions and concept explanations",
                "Rank tracking and performance analytics",
                "Coaching center integration for private batches",
              ].map((point) => (
                <Flex key={point} align="flex-start" gap={3}>
                  <Box mt={1} flexShrink={0}>
                    <Flex w="20px" h="20px" bg="#dcfce7" borderRadius="full" align="center" justify="center">
                      <FaCheckCircle size={11} color="#16a34a" />
                    </Flex>
                  </Box>
                  <Text fontSize="15px" color="#334155" fontWeight="500" lineHeight="1.6">{point}</Text>
                </Flex>
              ))}
            </Flex>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(2,1fr)"
            gap={4}
          >
            {features.map(({ icon, title, desc, color }) => (
              <Box
                key={title}
                bg="#f8fafc" borderRadius="20px" p={5}
                border="1px solid #e2e8f0"
                _hover={{ bg: "white", boxShadow: "0 8px 30px rgba(0,0,0,0.08)", transform: "translateY(-3px)", borderColor: color }}
                transition="all 0.25s"
              >
                <Flex
                  w="44px" h="44px" bg={`${color}12`} borderRadius="12px"
                  align="center" justify="center" color={color} fontSize="18px" mb={4}
                >
                  {icon}
                </Flex>
                <Text fontSize="14px" fontWeight="800" color="#0f172a" mb={2} lineHeight="1.3">{title}</Text>
                <Text fontSize="12px" color="#94a3b8" lineHeight="1.7">{desc}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <Section bg="#f8fafc">
        <SectionTitle
          pill="Testimonials"
          title="Students Jo"
          italic="Crack Kar Chuke Hain"
          sub="Real students. Real results. Unhi ki baat jo yahan se padh ke exam pass kar chuke hain."
        />
        <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={6}>
          {testimonials.map(({ name, tag, color, init, text }) => (
            <Box
              key={name}
              bg="white" borderRadius="24px" p={7}
              border="1px solid #e2e8f0"
              boxShadow="0 2px 12px rgba(0,0,0,0.04)"
              _hover={{ boxShadow: "0 16px 40px rgba(0,0,0,0.1)", transform: "translateY(-4px)" }}
              transition="all 0.3s"
              position="relative"
            >
              <Text
                position="absolute" top={4} right={6}
                fontFamily="'Instrument Serif',serif"
                fontSize="80px" color={`${color}15`} lineHeight="1"
              >
                "
              </Text>

              <Flex mb={4} gap={1}>
                {[1,2,3,4,5].map((s) => <FaStar key={s} size={13} color="#f59e0b" />)}
              </Flex>

              <Text fontSize="14px" color="#475569" lineHeight="1.9" mb={6} fontStyle="italic">
                "{text}"
              </Text>

              <Box h="1px" bg="#f1f5f9" mb={5} />

              <Flex align="center" gap={3}>
                <Flex
                  w="44px" h="44px" borderRadius="full" flexShrink={0}
                  bg={color} align="center" justify="center"
                  fontSize="13px" fontWeight="800" color="white"
                >
                  {init}
                </Flex>
                <Box>
                  <Text fontSize="14px" fontWeight="800" color="#0f172a">{name}</Text>
                  <Text fontSize="12px" color="#16a34a" fontWeight="700">{tag}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <Box
        bg="linear-gradient(135deg,#1e3a5f 0%,#0f172a 100%)"
        py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }}
        position="relative" overflow="hidden"
      >
        <Box position="absolute" top="-80px" right="-80px" w="320px" h="320px" borderRadius="full"
          bg="rgba(59,130,246,0.06)" />
        <Box position="absolute" bottom="-60px" left="-60px" w="240px" h="240px" borderRadius="full"
          bg="rgba(16,185,129,0.06)" />

        <Box maxW="680px" mx="auto" textAlign="center" position="relative">
          <Box display="inline-block" bg="rgba(59,130,246,0.15)" color="#60a5fa"
            px={4} py={1} borderRadius="full" fontSize="12px" fontWeight="700"
            letterSpacing="1.5px" textTransform="uppercase" mb={6} border="1px solid rgba(59,130,246,0.25)">
            Get Started Today
          </Box>
          <Text
            fontFamily="'Instrument Serif',serif"
            fontSize={{ base: "34px", md: "52px" }}
            color="white" lineHeight="1.15" mb={5}
          >
            Aaj Se Hi Apni{" "}
            <Text as="span" fontStyle="italic" color="#60a5fa">Preparation</Text>{" "}
            Shuru Karo
          </Text>
          <Text fontSize={{ base: "15px", md: "17px" }} color="#94a3b8" mb={10} lineHeight="1.8">
            50,000+ students pehle se yahan hain. Free join karo aur apna exam crack karo.
          </Text>

          <Flex justify="center" gap={4} flexWrap="wrap" mb={10}>
            <Box
              as={Link} to="/auth/signup"
              display="inline-flex" alignItems="center" gap={2}
              bg="#2563eb" color="white"
              px={8} py={4} borderRadius="14px" fontWeight="700" fontSize="15px"
              _hover={{ bg: "#1d4ed8", transform: "translateY(-2px)", boxShadow: "0 12px 28px rgba(37,99,235,0.4)" }}
              transition="all 0.2s"
            >
              Free Mein Register Karo <FaArrowRight size={13} />
            </Box>
            <Box
              as={Link} to="/questionList"
              display="inline-flex" alignItems="center" gap={2}
              bg="rgba(255,255,255,0.08)" color="white"
              px={8} py={4} borderRadius="14px" fontWeight="600" fontSize="15px"
              border="1px solid rgba(255,255,255,0.15)"
              _hover={{ bg: "rgba(255,255,255,0.14)", transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              <FaPlay size={12} /> Pehle Try Karo
            </Box>
          </Flex>

          <Flex justify="center" gap={8} flexWrap="wrap">
            {["No Credit Card", "Instant Access", "Always Free"].map((b) => (
              <Flex key={b} align="center" gap={2} color="#64748b">
                <FaCheckCircle size={13} color="#22c55e" />
                <Text fontSize="13px" fontWeight="600">{b}</Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* ══════════════════════════════════════
          SOCIAL
      ══════════════════════════════════════ */}
      <Section bg="white">
        <SectionTitle
          pill="Community"
          title="Hamare Saath"
          italic="Judo"
          sub="Latest study material, tips aur updates ke liye follow karo. 100k+ students already connected hain."
        />
        <Flex justify="center" flexWrap="wrap" gap={4}>
          {socials.map(({ icon, label, sub, bg, glow, onClick }) => (
            <Box
              key={label} onClick={onClick}
              cursor="pointer" textAlign="center"
              bg="white" borderRadius="20px" p={6}
              border="1.5px solid #e2e8f0"
              w={{ base: "calc(50% - 8px)", sm: "160px" }}
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: `0 16px 32px ${glow}`,
                borderColor: bg,
              }}
              transition="all 0.28s cubic-bezier(0.34,1.56,0.64,1)"
            >
              <Flex
                w="52px" h="52px" borderRadius="16px" mx="auto"
                align="center" justify="center" color="white" mb={3}
                bg={bg} boxShadow={`0 6px 16px ${glow}`}
              >
                {icon}
              </Flex>
              <Text fontSize="14px" fontWeight="800" color="#0f172a" mb={1}>{label}</Text>
              <Text fontSize="12px" color="#94a3b8" fontWeight="500">{sub}</Text>
            </Box>
          ))}
        </Flex>
      </Section>

      <Box w={{ base: "95%", md: "90%" }} maxW="1160px" mx="auto" pb={8}>
        <AdsterraBanner />
      </Box>
      <FloatingVideoAd />
    </Box>
  );
};

export default Home;









// import { Box, Flex, Text, Image, Spinner } from "@chakra-ui/react";

// import {
//   FaYoutube,
//   FaTelegram,
//   FaInstagram,
//   FaWhatsapp,
//   FaBook,
//   FaCalculator,
//   FaBrain,
//   FaGlobe,
//   FaBookmark,
//   FaFacebook,
// } from "react-icons/fa";

// import { Link, useNavigate } from "react-router-dom";
// import Slideshow from "./Slideshow";
// import { setLocalStorage } from "../helpers/localStorage";
// import { useRef, useState, useEffect } from "react";
// import AdBanner from "./AdBanner";
// import FloatingVideoAd from "./FloatingVideoAd";
// import AdsterraBanner from "./AdsterraBanner";

// const Home = ({ setchoosesub }) => {
//   const navigate = useNavigate();
//   const subjectsRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading (you can replace this with actual data fetching)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000); // Adjust time as needed

//     return () => clearTimeout(timer);
//   }, []);

//   const setsub = (pro, sub = null) => {
//     setchoosesub(pro);
//     setLocalStorage("cat", sub);
//     navigate("/questionList");
//   };

//   const scrollToSubjects = () => {
//     subjectsRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   if (isLoading) {
//     return (
//       <Box
//         minH="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         bg="white"
//       >
//         <Flex direction="column" align="center" gap={6}>
//           {/* Animated Spinner */}
//           <Box position="relative">
//             <Spinner
//               thickness="4px"
//               speed="0.65s"
//               emptyColor="gray.200"
//               color="#667eea"
//               size="xl"
//               w="80px"
//               h="80px"
//             />
//             <Box
//               position="absolute"
//               top="50%"
//               left="50%"
//               transform="translate(-50%, -50%)"
//             >
//               <FaBook size={32} color="#667eea" />
//             </Box>
//           </Box>

//           {/* Loading Text */}
//           <Flex direction="column" align="center" gap={2}>
//             <Text
//               color="#2d3748"
//               fontSize="24px"
//               fontWeight="700"
//               letterSpacing="0.5px"
//             >
//               Loading Quiz Portal
//             </Text>
//             <Text color="#718096" fontSize="14px" fontWeight="400">
//               Preparing your questions...
//             </Text>
//           </Flex>

//           {/* Animated Dots */}
//           <Flex gap={2}>
//             {[0, 1, 2].map((i) => (
//               <Box
//                 key={i}
//                 w="10px"
//                 h="10px"
//                 borderRadius="full"
//                 bg="#667eea"
//                 animation={`bounce 1.4s infinite ease-in-out`}
//                 style={{ animationDelay: `${i * 0.16}s` }}
//               />
//             ))}
//           </Flex>
//         </Flex>

//         {/* CSS Animation */}
//         <style>
//           {`
//             @keyframes bounce {
//               0%, 80%, 100% {
//                 transform: scale(0);
//                 opacity: 0.5;
//               }
//               40% {
//                 transform: scale(1);
//                 opacity: 1;
//               }
//             }
//           `}
//         </style>
//       </Box>
//     );
//   }

//   return (
//     <Box pb={{ base: 6, md: 8, lg: 12 }}>
//       {/* Slideshow */}
//       <Box mb={{ base: 6, md: 8 }}>
//         <Slideshow scrollToSubjects={scrollToSubjects} />
//       </Box>

//       {/* VIDEO AD - After Slideshow */}
//       {/* <Box
//         w={{ base: "95%", md: "90%", lg: "85%" }}
//         maxW="1200px"
//         mx="auto"
//         mb={{ base: 6, md: 8 }}
//       >
//         <AdBanner type="video" label="Video Advertisement" />
//       </Box> */}

//       {/* ================= SOCIAL MEDIA ================= */}
//       <Box
//         w={{ base: "95%", md: "90%", lg: "85%" }}
//         maxW="1200px"
//         mx="auto"
//         mb={{ base: 8, md: 10, lg: 12 }}
//         p={{ base: 5, md: 6, lg: 8 }}
//         bg="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
//         borderRadius={{ base: "16px", md: "20px" }}
//         boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
//       >
//         <Text
//           textAlign="center"
//           fontSize={{ base: "20px", md: "24px", lg: "26px" }}
//           fontWeight="600"
//           mb={{ base: 6, md: 7, lg: 8 }}
//           color="#2d3748"
//           letterSpacing="0.3px"
//         >
//           Follow Us On
//         </Text>

//         <Flex
//           justifyContent="center"
//           flexWrap="wrap"
//           gap={{ base: 4, md: 5, lg: 6 }}
//           maxW="900px"
//           mx="auto"
//         >
//           {/* YouTube */}
//           <Box
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #FF0000 0%, #cc0000 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(255, 0, 0, 0.3)"
//             >
//               <FaYoutube size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               YouTube
//             </Text>
//           </Box>

//           {/* Telegram */}
//           <Box
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #29b6f6 0%, #1e88e5 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(41, 182, 246, 0.3)"
//             >
//               <FaTelegram size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               Telegram
//             </Text>
//           </Box>

//           {/* Instagram */}
//           <Box
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #E4405F 0%, #c13584 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(228, 64, 95, 0.3)"
//             >
//               <FaInstagram size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               Instagram
//             </Text>
//           </Box>

//           {/* Facebook */}
//           <Box
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #1877F2 0%, #0d65d9 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(24, 119, 242, 0.3)"
//             >
//               <FaFacebook size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               Facebook
//             </Text>
//           </Box>

//           {/* WhatsApp */}
//           <Box
//             onClick={() =>
//               window.open(
//                 "https://api.whatsapp.com/send?phone=919696306817&text=Hi!%20want%20help.",
//                 "_blank",
//               )
//             }
//             textAlign="center"
//             _hover={{
//               transform: "translateY(-8px) scale(1.05)",
//               cursor: "pointer",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             p={{ base: 4, md: 5 }}
//             borderRadius={{ base: "12px", md: "16px" }}
//             bg="white"
//             boxShadow="0 2px 8px rgba(0, 0, 0, 0.05)"
//             _active={{ transform: "translateY(-4px) scale(1.02)" }}
//             w={{ base: "calc(50% - 8px)", sm: "140px", md: "150px" }}
//             minW={{ base: "120px", md: "140px" }}
//           >
//             <Box
//               bg="linear-gradient(135deg, #25D366 0%, #1ebe57 100%)"
//               borderRadius="full"
//               p={{ base: 3, md: 4 }}
//               display="inline-flex"
//               mb={{ base: 2, md: 3 }}
//               boxShadow="0 4px 12px rgba(37, 211, 102, 0.3)"
//             >
//               <FaWhatsapp size={36} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="500"
//               color="#2d3748"
//             >
//               WhatsApp
//             </Text>
//           </Box>
//         </Flex>
//       </Box>

//       {/* ================= SUBJECTS ================= */}
//       <Box
//         ref={subjectsRef}
//         w={{ base: "95%", md: "90%", lg: "85%" }}
//         maxW="1200px"
//         mx="auto"
//       >
//         <Text
//           textAlign="center"
//           fontSize={{ base: "20px", md: "24px", lg: "26px" }}
//           fontWeight="600"
//           mb={{ base: 6, md: 7, lg: 8 }}
//           color="#2d3748"
//           letterSpacing="0.3px"
//         >
//           Top Competitive Subject Quiz
//         </Text>

//         <Box
//           display="grid"
//           gridTemplateColumns={{
//             base: "repeat(2, 1fr)",
//             sm: "repeat(2, 1fr)",
//             md: "repeat(3, 1fr)",
//             lg: "repeat(6, 1fr)",
//           }}
//           gap={{ base: 4, md: 5, lg: 6 }}
//         >
//           {/* Vocabulary */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(44, 100, 255, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #2c64ff 0%, #2658e6 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("vocabulary")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaBook size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               Vocabulary
//             </Text>
//           </Box>

//           {/* English */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(102, 175, 221, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #66afdd 0%, #5a9dc9 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("Eng")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaBook size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               English
//             </Text>
//           </Box>

//           {/* General Studies */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(255, 120, 44, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #ff782c 0%, #e66a28 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("gs")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaGlobe size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               General Studies
//             </Text>
//           </Box>

//           {/* Reasoning */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(72, 187, 120, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #48bb78 0%, #41a968 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("Reasoning")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaBrain size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               Reasoning
//             </Text>
//           </Box>

//           {/* Maths */}
//           <Box
//             _hover={{
//               transform: "translateY(-8px)",
//               boxShadow: "0 12px 24px rgba(65, 216, 213, 0.3)",
//             }}
//             transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//             bg="linear-gradient(135deg, #41d8d5 0%, #39c2bf 100%)"
//             color="white"
//             borderRadius={{ base: "12px", md: "16px" }}
//             boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//             p={{ base: 4, md: 5, lg: 6 }}
//             h={{ base: "140px", md: "150px", lg: "160px" }}
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             cursor="pointer"
//             onClick={() => setsub("math")}
//           >
//             <Box
//               bg="rgba(255, 255, 255, 0.2)"
//               borderRadius="full"
//               p={{ base: 2.5, md: 3 }}
//               mb={{ base: 2, md: 3 }}
//             >
//               <FaCalculator size={32} color="white" />
//             </Box>
//             <Text
//               fontSize={{ base: "14px", md: "15px" }}
//               fontWeight="600"
//               letterSpacing="0.3px"
//             >
//               Maths
//             </Text>
//           </Box>

//           {/* Saved */}
//           <Link to="/Saved-question">
//             <Box
//               _hover={{
//                 transform: "translateY(-8px)",
//                 boxShadow: "0 12px 24px rgba(92, 76, 227, 0.3)",
//               }}
//               transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
//               bg="linear-gradient(135deg, #5c4ce3 0%, #5244cc 100%)"
//               color="white"
//               borderRadius={{ base: "12px", md: "16px" }}
//               boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
//               p={{ base: 4, md: 5, lg: 6 }}
//               h={{ base: "140px", md: "150px", lg: "160px" }}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               cursor="pointer"
//             >
//               <Box
//                 bg="rgba(255, 255, 255, 0.2)"
//                 borderRadius="full"
//                 p={{ base: 2.5, md: 3 }}
//                 mb={{ base: 2, md: 3 }}
//               >
//                 <FaBookmark size={32} color="white" />
//               </Box>
//               <Text
//                 fontSize={{ base: "14px", md: "15px" }}
//                 fontWeight="600"
//                 letterSpacing="0.3px"
//               >
//                 Saved Question
//               </Text>
//             </Box>
//           </Link>
//         </Box>
//       </Box>

//       {/* BANNER AD - Before Footer */}
//       <Box w={{ base: "95%", md: "90%", lg: "85%" }} maxW="1200px" mx="auto">
//         <AdsterraBanner />
//       </Box>

//       {/* Floating Video Ad - Bottom Right */}
//       <FloatingVideoAd />
//     </Box>
//   );
// };

// export default Home;
