import dayjs from "dayjs";

async function generateUniqueString(prefix: string = ""): Promise<string> {
    const timestamp = dayjs().format("YYYY-MM-DD-HH-mm-ss");
    const randomText = Math.random().toString(36).substring(2, 8);
    return `${prefix ? `${prefix}-` : ""}${randomText}-${timestamp}`;
}

export const Generator = {
    generateUniqueString,
};
