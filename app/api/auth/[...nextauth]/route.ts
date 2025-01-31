import type { NextRequest } from "next/server";
import { auth } from "@/../app/auth";

// L'objet auth contient déjà les handlers GET et POST appropriés
export const GET = auth;
export const POST = auth;
