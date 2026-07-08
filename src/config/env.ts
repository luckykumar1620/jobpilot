import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    BASE_URL: process.env.BASE_URL!,
    EMAIL: process.env.NAUKRI_EMAIL!,
    PASSWORD: process.env.NAUKRI_PASSWORD!,
    HEADLESS: process.env.HEADLESS === "true"
};