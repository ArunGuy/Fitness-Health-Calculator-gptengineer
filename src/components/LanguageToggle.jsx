import React from 'react';
import { Button } from "@/components/ui/button";

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <Button
      variant="outline"
      onClick={() => setLanguage(language === "en" ? "th" : "en")}
    >
      {language === "en" ? "TH" : "EN"}
    </Button>
  );
};

export default LanguageToggle;