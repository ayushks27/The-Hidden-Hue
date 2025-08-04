import { cn } from "@/utils/cn";

type SplitTextProps = {
    text: string;
    className?: string;
};

const SplitText = ({ text, className }: SplitTextProps) => {
    return (
        <>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className={cn(
                        "inline-block text-[8.594vw] leading-none",
                        className
                    )}
                    style={{
                        transform: "translateY(100px)",
                        marginRight: char === " " ? "3.0rem" : "0",
                        whiteSpace: "pre", // preserve space character
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </>
    );
};

export default SplitText;
