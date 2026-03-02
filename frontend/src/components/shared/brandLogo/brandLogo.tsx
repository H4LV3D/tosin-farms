import Link from "next/link";
import React from "react";

interface IconProps {
  color?: string;
  size?: number;
}

const BrandLogo: React.FC<IconProps> = ({ color = "#b45309", size = 32 }) => {
  return (
    <>
      <Link href="/" className="flex items-center gap-3 group">
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="1.5" />
          <path
            d="M16 24 C16 24 9 18 9 12 A7 7 0 0 1 23 12 C23 18 16 24 16 24Z"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M16 14 L16 24"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13 17 L16 14 L19 17"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* <span className="font-display font-bold text-[#1c1917] text-lg tracking-tight">
          Tosi Farms
        </span> */}
      </Link>
    </>
  );
};

export default BrandLogo;
