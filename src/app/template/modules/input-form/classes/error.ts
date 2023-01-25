import { ErrorLevel } from "./error-level";

export interface Error {
  message: string;
  level: ErrorLevel;
}
