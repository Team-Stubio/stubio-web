import { cache } from "react";
import { codeToHtml } from "shiki";

type CodeLanguage = "ts" | "js";

export const highlightCode = cache(
  async (code: string, lang: CodeLanguage = "ts") => {
    return codeToHtml(code, {
      lang,
      theme: "github-dark",
    });
  },
);
