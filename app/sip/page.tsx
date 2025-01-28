import { ChevronRight } from "lucide-react";
import ProjectTable from "@/components/ProjectTable";
import { projects } from "../data/projects";

function SIP() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <span>Projects</span>
                    <ChevronRight size={16} className="text-gray-400" />
                    <span>SIP</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">SIP</h1>
            </div>

            <ProjectTable projects={projects} />
        </div>
    );
}

export default SIP;
