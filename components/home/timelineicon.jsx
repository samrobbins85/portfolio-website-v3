import Trophy from "@/svg/trophy";
import Code from "@/svg/code";
import { MortarBoardIcon } from "@primer/octicons-react";
import Pass from "@/svg/pass";
import Podium from "@/svg/podium";

export default function TimelineIcon({ type }) {
  switch (type) {
    case "Event":
      return <Pass className="text-gray-700 h-6 w-6" />;
    case "Education":
      return <MortarBoardIcon size={16} className="text-purple-700 h-6 w-6" />;
    case "Hackathon":
      return <Code className="text-blue-700 h-6 w-6" />;
    case "Award":
      return <Trophy className="text-yellow-600 h-6 w-6" />;
    case "Speaking":
      return <Podium className="text-red-500 h-6 w-6" />;
    default:
      return <Code className="text-blue-700 h-6 w-6" />;
  }
}