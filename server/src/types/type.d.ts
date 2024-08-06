import { ROLES } from "../utils/constants";

export type Role = (typeof ROLES)[keyof typeof ROLES];
