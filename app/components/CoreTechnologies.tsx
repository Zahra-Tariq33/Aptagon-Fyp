"use client";

import React, { useMemo, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useInView } from "framer-motion";
import * as SiIcons from "react-icons/si";

// --- Constants ---
const TEAL = "#0EBAB0";
const NAVY = "#073A53";
const SECTION_BG = "#0EBAB033";

const COLS = 7;
const TW = 145;
const TH = 90;
const GAP = 15;

const CATS = {
  Frameworks: [
    "Django","Kafka","YOLO","Gensim","XGBoost","OpenCV","NLTK","TensorFlow",
    "PyTorch","Fast.ai","KubeFlow","Hugging Face Transformers","Flask","Next.js",
    "Stanford NLP","Scikit-learn","spaCy","MLflow","React.js","Keras",
    "LightGBM","Apache Spark (MLlib)","FastAPI","Hadoop",
  ],
  Languages: ["Java","JavaScript (Node.js)","C++","Python","Scala","R","Julia","Go"],
  Platforms: [
    "Google Cloud AI","TensorFlow Lite","Heroku","Docker","IBM Watson","DVC",
    "NVIDIA Jetson","OpenVINO","AWS AI/ML","Hugging Face Hub","GitHub Actions",
    "Microsoft Azure AI","Airflow","GitLab CI/CD","Kubernetes",
  ],
} as const;

type Tab = keyof typeof CATS;

// ── Custom SVG Icons for items without official react-icons ──
type IconProps = { style?: React.CSSProperties; className?: string };

const YoloIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
  </svg>
);

const GensimIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={style} className={className}>
    <path d="M2 18 Q5 10 8 15 Q11 20 14 12 Q17 4 20 9 Q22 12 23 10"/>
    <circle cx="8" cy="15" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="14" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="20" cy="9" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const XGBoostIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <rect x="10" y="1" width="4" height="4" rx="1"/>
    <rect x="2" y="9" width="4" height="4" rx="1"/>
    <rect x="18" y="9" width="4" height="4" rx="1"/>
    <rect x="1" y="18" width="4" height="4" rx="1"/>
    <rect x="10" y="18" width="4" height="4" rx="1"/>
    <rect x="19" y="18" width="4" height="4" rx="1"/>
    <line x1="12" y1="5" x2="4" y2="9" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="12" y1="5" x2="20" y2="9" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="4" y1="13" x2="3" y2="18" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="4" y1="13" x2="12" y2="18" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="20" y1="13" x2="21" y2="18" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const NLTKIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M4 2h11l5 5v15H4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 2v5h5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="7" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="7" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="16.5" r="1" fill="currentColor"/>
    <circle cx="19" cy="16.5" r="1" fill="currentColor"/>
  </svg>
);

const LightGBMIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M13 2L4 14h7l-2 8 11-13h-8z"/>
    <path d="M18 3 Q21 5 20 8 Q18 10 16 8 Q15 5 18 3z" opacity="0.7"/>
  </svg>
);

const StanfordNLPIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M3 22h18"/>
    <path d="M5 22V11l7-8 7 8v11" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="15" width="2.5" height="7"/>
    <rect x="12.5" y="15" width="2.5" height="7"/>
    <rect x="8.5" y="11" width="7" height="3.5" rx="0.5" opacity="0.7"/>
  </svg>
);

const FastAiIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M13 2L3 14h8l-3 8 13-13h-9z"/>
  </svg>
);

const KubeFlowIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={style} className={className}>
    <path d="M12 2l9 5.2v9.6L12 22l-9-5.2V7.2z"/>
    <path d="M12 7l5 2.9v5.2L12 17l-5-2.9V9.9z" fill="currentColor" opacity="0.5"/>
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
  </svg>
);

const SparkMllibIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M11 2L3 13h7l-3 9 14-14h-9z"/>
  </svg>
);

const HadoopIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <ellipse cx="13" cy="10" rx="7" ry="6"/>
    <path d="M6 10 Q2 9 2 13 Q2 17 6 17" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="11" cy="8.5" r="1.2" fill="white"/>
    <line x1="10" y1="16" x2="10" y2="22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="15" y1="16" x2="15" y2="21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M17 7 Q21 5 20 10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const OpenVINOIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M1 12 C5 5 19 5 23 12 C19 19 5 19 1 12z" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="12" cy="12" r="1.8" fill="white"/>
    <circle cx="12" cy="12" r="0.8" fill="currentColor"/>
  </svg>
);

const NvidiaJetsonIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="8" y="8" width="8" height="8" rx="1"/>
    <line x1="8" y1="2" x2="8" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="16" y1="2" x2="16" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8" y1="19" x2="8" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="16" y1="19" x2="16" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="2" y1="9" x2="5" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="2" y1="15" x2="5" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="19" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="19" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// AWS — official orange smile arrow logo shape
const AWSIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.072.056.144.056.208 0 .096-.056.192-.176.288l-.576.384c-.08.056-.16.08-.232.08-.096 0-.192-.048-.288-.136a3.165 3.165 0 0 1-.344-.448 7.06 7.06 0 0 1-.296-.576c-.752.888-1.696 1.332-2.832 1.332-.808 0-1.456-.232-1.928-.696-.472-.464-.712-1.08-.712-1.848 0-.816.288-1.48.872-1.984.584-.504 1.36-.756 2.344-.756.328 0 .664.024 1.016.08.352.056.712.136 1.088.232v-.688c0-.72-.152-1.224-.448-1.52-.304-.296-.816-.44-1.544-.44-.336 0-.68.04-1.032.128a7.578 7.578 0 0 0-1.032.344 2.764 2.764 0 0 1-.336.128.6.6 0 0 1-.152.024c-.136 0-.2-.096-.2-.296v-.464c0-.152.016-.264.056-.328a.6.6 0 0 1 .224-.192c.336-.176.736-.32 1.208-.44A6.06 6.06 0 0 1 4 5.5c1.12 0 1.936.256 2.456.768.512.512.776 1.288.776 2.328v3.072l-.469-.632zm-3.672.872c.312 0 .632-.056.968-.168.336-.112.632-.32.88-.608.152-.184.264-.384.32-.608.056-.224.088-.496.088-.816v-.392a8.119 8.119 0 0 0-.88-.144 7.264 7.264 0 0 0-.896-.056c-.64 0-1.104.128-1.424.392-.32.264-.472.632-.472 1.112 0 .448.112.784.344 1.016.224.232.552.272.872.272h.2z"/>
    <path d="M12.4 12.2c-.168 0-.28-.024-.352-.08-.072-.048-.136-.16-.192-.312L9.944 5.812c-.056-.152-.08-.256-.08-.32 0-.128.064-.2.192-.2h.784c.176 0 .296.024.36.08.072.048.128.16.184.312l1.376 5.424 1.28-5.424c.048-.16.104-.264.176-.312.072-.048.2-.08.368-.08h.64c.176 0 .296.024.368.08.072.048.136.16.176.312l1.296 5.488 1.416-5.488c.056-.16.12-.264.184-.312.072-.048.192-.08.36-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128-.008.048-.024.112-.056.2l-1.952 6.008c-.056.16-.12.264-.192.312-.072.048-.192.08-.352.08h-.688c-.176 0-.296-.024-.368-.08-.072-.056-.136-.16-.176-.32L14.2 6.836l-1.272 5.044c-.048.16-.104.264-.176.32-.072.056-.2.08-.368.08H12.4z"/>
    <path d="M19.936 12.38c-.416 0-.832-.048-1.232-.144a3.56 3.56 0 0 1-.904-.336c-.128-.072-.216-.152-.248-.232a.617.617 0 0 1-.048-.24v-.48c0-.2.072-.296.208-.296.056 0 .112.008.168.024.056.016.136.056.224.096.304.136.632.24.984.312.36.072.712.112 1.072.112.568 0 1.008-.104 1.312-.304.304-.2.464-.488.464-.856 0-.256-.08-.464-.24-.64-.16-.176-.464-.336-.896-.48l-1.288-.4c-.648-.2-1.128-.504-1.424-.896a2.17 2.17 0 0 1-.44-1.312c0-.376.08-.712.24-1.008.16-.296.376-.552.648-.76.272-.208.584-.368.944-.48.36-.112.736-.16 1.136-.16.2 0 .408.016.608.04.2.032.384.064.552.104.168.04.32.08.456.128.136.048.24.096.312.144a.64.64 0 0 1 .216.192.453.453 0 0 1 .064.248v.448c0 .2-.072.304-.208.304a.96.96 0 0 1-.352-.112 4.26 4.26 0 0 0-1.768-.352c-.52 0-.928.088-1.208.272-.28.184-.424.456-.424.832 0 .256.088.472.264.648.176.176.496.352.952.504l1.264.4c.64.2 1.104.488 1.384.864.28.376.416.8.416 1.272 0 .384-.08.728-.232 1.032-.16.304-.376.568-.664.784-.288.224-.632.384-1.024.496-.408.12-.848.176-1.32.176z"/>
    <path d="M21.024 16.728c-2.608 1.928-6.392 2.952-9.648 2.952-4.56 0-8.672-1.688-11.784-4.496-.24-.216-.024-.512.264-.344 3.352 1.952 7.496 3.12 11.776 3.12 2.888 0 6.056-.6 8.976-1.84.44-.192.808.288.416.608z"/>
    <path d="M22.064 15.52c-.328-.424-2.168-.2-2.992-.1-.248.032-.288-.192-.064-.352 1.464-1.032 3.872-.736 4.152-.392.28.344-.072 2.76-1.448 3.912-.208.176-.408.08-.312-.152.312-.776 1.0-2.496.664-2.916z"/>
  </svg>
);

// Microsoft Azure — official 4-color flag logo
const AzureIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M13.5 2L7 13.5l3.5 6H22L13.5 2z" opacity="0.9"/>
    <path d="M2 19.5l5.5-9.5L11 16l-3 3.5H2z" opacity="0.7"/>
    <path d="M10.5 10l-4 9.5h15.5L10.5 10z" opacity="0.5"/>
  </svg>
);

// IBM Watson — brain/ai waves
const IBMWatsonIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <text x="1" y="17" fontSize="14" fontWeight="900" fontFamily="monospace" fill="currentColor">IBM</text>
    <path d="M3 19 Q7 16 12 19 Q17 22 21 19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 21 Q9 18.5 12 21 Q15 23.5 19 21" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

// Google Cloud AI — cloud with neural dots
const GoogleCloudAIIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={style} className={className}>
    <path d="M6.5 9.5A5.5 5.5 0 0 1 17.2 8H18a4 4 0 0 1 0 8H6.5a5 5 0 0 1 0-10 .1.1 0 0 1 0 1.5z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="11" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
    <line x1="9" y1="13" x2="12" y2="11" stroke="currentColor" strokeWidth="1"/>
    <line x1="12" y1="11" x2="15" y2="13" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

// DVC — data version arrows
const DVCIcon = ({ style, className }: IconProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M12 2L2 7l10 5 10-5z" opacity="0.9"/>
    <path d="M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M2 17l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.6"/>
  </svg>
);

// ── BRAND MAP ──
const BRAND: Record<string, {
  siIcon?: string;
  color: string;
  CustomIcon?: React.FC<IconProps>;
}> = {
  // Languages
  "Python":                    { siIcon:"SiPython",           color:"#4d9de0" },
  "Scala":                     { siIcon:"SiScala",            color:"#f07070" },
  "Java":                      { siIcon:"SiOpenjdk",          color:"#f89820" },
  "JavaScript (Node.js)":      { siIcon:"SiJavascript",       color:"#f0d060" },
  "C++":                       { siIcon:"SiCplusplus",        color:"#5b9fd4" },
  "Go":                        { siIcon:"SiGo",               color:"#4dcce8" },
  "R":                         { siIcon:"SiR",                color:"#6090d3" },
  "Julia":                     { siIcon:"SiJulia",            color:"#b07ad4" },

  // Frameworks — official react-icons
  "Django":                    { siIcon:"SiDjango",           color:"#3db87a" },
  "TensorFlow":                { siIcon:"SiTensorflow",       color:"#ff8c30" },
  "PyTorch":                   { siIcon:"SiPytorch",          color:"#ff6b4a" },
  "React.js":                  { siIcon:"SiReact",            color:"#4ec9e8" },
  "Next.js":                   { siIcon:"SiNextdotjs",        color:"#ffffff" },
  "FastAPI":                   { siIcon:"SiFastapi",          color:TEAL },
  "Flask":                     { siIcon:"SiFlask",            color:"#cccccc" },
  "Keras":                     { siIcon:"SiKeras",            color:"#ff5555" },
  "Scikit-learn":              { siIcon:"SiScikitlearn",      color:"#f0a040" },
  "spaCy":                     { siIcon:"SiSpacy",            color:"#30c0e8" },
  "MLflow":                    { siIcon:"SiMlflow",           color:"#30aaee" },
  "OpenCV":                    { siIcon:"SiOpencv",           color:"#9060e8" },
  "Hugging Face Transformers": { siIcon:"SiHuggingface",      color:"#f0cc40" },
  "Kafka":                     { siIcon:"SiApachekafka",      color:"#aaaaaa" },

  // Frameworks — custom SVG
  "YOLO":                      { color:"#30d0c8",  CustomIcon: YoloIcon },
  "Gensim":                    { color:"#60c8a0",  CustomIcon: GensimIcon },
  "XGBoost":                   { color:"#f07830",  CustomIcon: XGBoostIcon },
  "NLTK":                      { color:"#4d9de0",  CustomIcon: NLTKIcon },
  "LightGBM":                  { color:"#88cc20",  CustomIcon: LightGBMIcon },
  "Stanford NLP":              { color:"#cc3333",  CustomIcon: StanfordNLPIcon },
  "Fast.ai":                   { color:"#ff6b4a",  CustomIcon: FastAiIcon },
  "KubeFlow":                  { color:"#5080f0",  CustomIcon: KubeFlowIcon },
  "Apache Spark (MLlib)":      { color:"#ff7040",  CustomIcon: SparkMllibIcon },
  "Hadoop":                    { color:"#55aaee",  CustomIcon: HadoopIcon },

  // Platforms — official react-icons
  "TensorFlow Lite":           { siIcon:"SiTensorflow",       color:"#ff8c30" },
  "Heroku":                    { siIcon:"SiHeroku",           color:"#9080cc" },
  "Docker":                    { siIcon:"SiDocker",           color:"#40aaee" },
  "DVC":                       { siIcon:"SiDvc",              color:"#c070e8" },
  "Hugging Face Hub":          { siIcon:"SiHuggingface",      color:"#f0cc40" },
  "GitHub Actions":            { siIcon:"SiGithubactions",    color:"#50aaff" },
  "Airflow":                   { siIcon:"SiApacheairflow",    color:"#30aaf0" },
  "GitLab CI/CD":              { siIcon:"SiGitlab",           color:"#ff8040" },
  "Kubernetes":                { siIcon:"SiKubernetes",       color:"#5080f0" },
  "NVIDIA Jetson":             { siIcon:"SiNvidia",           color:"#88cc30" },

  // Platforms — custom SVG (no official icon in react-icons/si)
  "AWS AI/ML":                 { color:"#ff9900",  CustomIcon: AWSIcon },
  "Microsoft Azure AI":        { color:"#0089d6",  CustomIcon: AzureIcon },
  "IBM Watson":                { color:"#4488ff",  CustomIcon: IBMWatsonIcon },
  "Google Cloud AI":           { color:"#6090f0",  CustomIcon: GoogleCloudAIIcon },
  "OpenVINO":                  { color:"#40aaee",  CustomIcon: OpenVINOIcon },
};

const getFallbackIcon = () => {
  const FallbackIcon = ({ style, className }: IconProps) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
  return FallbackIcon;
};

const getBrand = (n: string) => {
  const d = BRAND[n];
  if (!d) return { Icon: getFallbackIcon(), color: TEAL };
  if (d.CustomIcon) return { Icon: d.CustomIcon, color: d.color };
  if (d.siIcon) {
    const SiIcon = (SiIcons as any)[d.siIcon];
    if (SiIcon) return { Icon: SiIcon, color: d.color };
  }
  return { Icon: getFallbackIcon(), color: d.color };
};

export default function TechSection() {
  const [tab, setTab] = useState<Tab>("Frameworks");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const maxItems = 24;
  const maxRows = Math.ceil(maxItems / COLS);
  const gridW = COLS * (TW + GAP) - GAP;
  const fixedGridH = maxRows * (TH + GAP) - GAP;
  const cx = gridW / 2;
  const cy = fixedGridH / 2;

  const names = CATS[tab] as unknown as string[];
  const tiles = useMemo(() =>
    names.map((name, i) => ({
      name, i,
      row: Math.floor(i / COLS),
      col: i % COLS,
      ...getBrand(name),
    })),
  [tab]);

  return (
    <section
      ref={sectionRef}
      style={{ background: SECTION_BG }}
      className="relative py-20 overflow-hidden"
    >
      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          className="flex items-center justify-center"
        >
          <div className="h-[2px] w-12 bg-[#073A53]" />
          <span className="text-xs tracking-[0.4em] text-[#073A53] font-bold uppercase mx-3">Our Tech Ecosystem</span>
          <div className="h-[2px] w-12 bg-[#073A53]" />
        </motion.div>

        <h2 className="text-[#073A53] text-6xl md:text-6xl font-bold my-4">
          Our <span className="text-[#0EBAB0]">Technology</span> Stack
        </h2>

        <p className="text-sm md:text-md mb-5">
          We leverage modern frameworks and robust languages to build future-proof software.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-2 bg-white rounded-2xl shadow-xl border border-teal-500/20 gap-2">
          {(Object.keys(CATS) as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-8 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 ${
                tab === t
                  ? "bg-[#073A53] text-white shadow-lg scale-105"
                  : "bg-transparent text-[#073A53] hover:bg-teal-500/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Burst Grid */}
      <div className="relative z-10 mx-auto" style={{ width: gridW, height: fixedGridH }}>
        <AnimatePresence mode="popLayout">
          {isInView && (
            <motion.div
              key={`${tab}-${isInView}`}
              className="w-full h-full"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {tiles.map((tile) => {
                const totalInTab = tiles.length;
                const lastRowIndex = Math.floor((totalInTab - 1) / COLS);
                const isLastRow = tile.row === lastRowIndex;
                const itemsInLastRow = totalInTab % COLS || COLS;
                const xOffset = isLastRow ? ((COLS - itemsInLastRow) * (TW + GAP)) / 2 : 0;

                const finalX = tile.col * (TW + GAP) + xOffset;
                const finalY = tile.row * (TH + GAP);

                const dx = finalX - cx + TW / 2;
                const dy = finalY - cy + TH / 2;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const staggerIn = (dist / (gridW * 0.8)) * 0.5;

                return (
                  <motion.div
                    key={tile.name}
                    style={{ position: "absolute", left: finalX, top: finalY, width: TW, height: TH }}
                    variants={{
                      hidden: { x: cx - finalX - TW / 2, y: cy - finalY - TH / 2, scale: 0, opacity: 0, rotate: angle * 0.4 },
                      visible: { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0,
                        transition: { duration: 0.8, delay: staggerIn, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <TileCard tile={tile} />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: `linear-gradient(#073A53 1px, transparent 1px), linear-gradient(90deg, #073A53 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
    </section>
  );
}

function TileCard({ tile }: { tile: { name: string; Icon: React.ElementType; color: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-full h-full group cursor-default"
    >
      <div className="w-full h-full rounded-2xl bg-[#073A53] p-5 flex flex-col items-center justify-center gap-3 border border-white/10 shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-[#073A53]/40 group-hover:border-white/30">
        <div className="relative">
          <div
            className="absolute inset-0 blur-xl opacity-40 group-hover:opacity-90 transition-opacity duration-500 scale-150"
            style={{ backgroundColor: tile.color }}
          />
          <tile.Icon
            className="text-3xl relative z-10 transition-transform duration-500 group-hover:scale-110"
            style={{ color: tile.color, fontSize: "1.875rem" }}
          />
        </div>
        <span className="text-[10px] font-black text-white uppercase tracking-[0.15em] text-center leading-tight">
          {tile.name}
        </span>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </motion.div>
  );
}