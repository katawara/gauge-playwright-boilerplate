import dayjs from "dayjs";

type GenerateUniqueStringArgs = {
    prefix?: string;
    suffix?: string;
};

function generateUniqueString(args: GenerateUniqueStringArgs = {}): string {
    const timestamp = dayjs().format("YYYY-MM-DD-HH-mm-ss");
    const randomText = Math.random().toString(36).substring(2, 8);
    return `${args.prefix ? `${args.prefix}-` : ""}${randomText}-${timestamp}${args.suffix ? `-${args.suffix}` : ""}`;
}

export const Generator = {
    generateUniqueString,
};
