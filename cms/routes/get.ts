import type { Request, Response } from "express";

import baseTemplate from "../templates/base.ts";

const _locale = {
  "en": {},
  "de": {},
};

export default (req: Request, res: Response) => {
  // const currentLanguage = req.lang || "en";
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const content = `
<div class="">
  Hellooo!!
  Hi
</div>
`;

  const html = baseTemplate(content, req);
  res.send(html);
};
