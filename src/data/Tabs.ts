import { Tab } from "../types";
import { FaBug, FaCode, FaRegLightbulb } from "react-icons/fa";

const Tabs: Tab[] = [
  {
    id: "explain",
    label: "Explain Code",
    icon: FaRegLightbulb,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "debug",
    label: "Debug Code",
    icon: FaBug,
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "generate",
    label: "Generate Code",
    icon: FaCode,
    gradient: "from-green-500 to-blue-500",
  },
];

export default Tabs;
