import process from "node:process";

import express from "express";

import type { NextFunction, Request, Response } from "express";

// Extend Request interface to include lang property
declare global {
  namespace Express {
    interface Request {
      lang: "en" | "de";
    }
  }
}

// Factory function to create language app with custom cookie name and endpoint
export function createLanguageApp(
  cookieName: string = "lang",
  endpointPath: string = "/set-lang",
) {
  const app = express();

  // NOTE: cookie-parser is required, but it should be only loaded once in order to avoid
  // 'stream is not readable' error, therefore we load it once in the main app

  // Function to set language cookie
  function setLanguageCookie(res: Response, language: string) {
    res.cookie(cookieName, language, {
      maxAge: 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      secure: false,
    });
  }

  // Language middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    let language = req.cookies?.[cookieName];
    if (language !== "en" && language !== "de") {
      language = "en";
      setLanguageCookie(res, language);
    }
    req.lang = language;
    next();
  });

  // Endpoint to set language cookie
  app.get(endpointPath, (req: Request, res: Response) => {
    // console.log('Setting language cookie');
    const lang = req.query.lang || "en";
    if (lang !== "en" && lang !== "de") {
      return res.status(400).send("Invalid language");
    }
    setLanguageCookie(res, lang);
    const ref = req.get("Referrer") || "/";
    res.redirect(ref);
  });

  return app;
}

// Default export with original behavior
const app = createLanguageApp(process.env.LANGUAGE_COOKIE_NAME || "lang");
export default app;
