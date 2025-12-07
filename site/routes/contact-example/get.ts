import type { Request, Response } from "express";

import { baseTemplate } from "../../templates/base.ts";
import template from "./template.ts";

export default (_req: Request, res: Response) => {
  const content = template();

  const html = baseTemplate(content);
  res.send(html);
};
