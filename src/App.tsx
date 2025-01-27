import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProjectTable from "./components/ProjectTable";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { projects } from "./data/projects";
import SIP from "./pages/SIP";
import SIPEdit from "./pages/SIPEdit";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50/50">
                <Header />
                <div className="flex pt-12">
                    <Sidebar />
                    <div className="flex-1 ml-64">
                        <div className="max-w-7xl mx-auto px-4 py-8">
                            <Routes>
                                <Route path="/SIP" element={<SIP />} />
                                <Route path="/SIP/edit" element={<SIPEdit />} />
                                <Route path="/" element={<Navigate to="/SIP" replace />} />
                                <Route path="/projects" element={<ProjectTable projects={projects} />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
