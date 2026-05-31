/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CVAnalyzer } from "./pages/CVAnalyzer";
import { Jobs } from "./pages/Jobs";
import { Roadmap } from "./pages/Roadmap";
import { Dashboard } from "./pages/Dashboard";
import { CVBuilder } from "./pages/CVBuilder";
import { SkillsGap } from "./pages/SkillsGap";
import { InterviewPrep } from "./pages/InterviewPrep";
import { Templates } from "./pages/Templates";
import { Settings } from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="builder" element={<CVBuilder />} />
          <Route path="cv-analyzer" element={<CVAnalyzer />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="skills" element={<SkillsGap />} />
          <Route path="interview" element={<InterviewPrep />} />
          <Route path="templates" element={<Templates />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
