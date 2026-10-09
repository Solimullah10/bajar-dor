import { auth } from "@/app/lib/auth"; // আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী সঠিক পাথ
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
