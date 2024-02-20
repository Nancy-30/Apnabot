import React from "react";
import Upload from "./components/Upload";
import Generate from "./components/Generate";
import Landing from "./components/Landing";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-green-900 select-none">
      <Landing />
      <Upload />
      <Generate />
      <Footer />
    </div>
  );
}
