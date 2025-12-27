import { FeatureGrid } from "../types";
import { FaBrain, FaBug, FaMagic } from "react-icons/fa";

const Features: FeatureGrid[] = [
  {
    title: "Smart Code Analysis",
    description:
      "Get detailed explanations of complex code snippets with AI-powered insights",
    icon: FaBrain,
  },
  {
    title: "Intelligent Debugging",
    description:
      "Find and fix bugs quickly with AI-driven debugging suggestions.",
    icon: FaBug,
  },
  {
    title: "Code Generation",
    description:
      "Generate code from natural language descriptions in multiple programming languages",
    icon: FaMagic,
  },
];

export default Features;
