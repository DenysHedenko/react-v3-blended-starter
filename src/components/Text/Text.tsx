import style from "./Text.module.css";

interface TextProps {
  children: React.ReactNode;
  textAlign?: "end" | "center" | "justify";
  marginBottom?: "margin-bottom10" | "margin-bottom20" | "margin-bottom0";
}

export default function Text({
  children,
  textAlign = "center",
  marginBottom = 'margin-bottom0'
}: TextProps) {
  return (
    <p
      className={[
        style["text"],
        style[textAlign],
        style[`marginBottom${marginBottom}`],
      ].join(" ")}
    >
      {children}
    </p>
  );
}
