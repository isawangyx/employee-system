import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    name: Joi.string().required(),
    salary: Joi.number().required(),
    department: Joi.string().valid("HR", "PS").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ errorMessage: error.details[0].message });
  } else {
    next();
  }
};
