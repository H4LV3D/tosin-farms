"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    openValue: string | null;
    toggle: (value: string) => void;
} | null>(null);

/**
 * Accordion container that manages open state of children items.
 * By default, it allows only one item to be open at a time.
 */
export const Accordion = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const [openValue, setOpenValue] = React.useState<string | null>(null);

    const toggle = React.useCallback((value: string) => {
        setOpenValue(prev => (prev === value ? null : value));
    }, []);

    return (
        <AccordionContext.Provider value={{ openValue, toggle }}>
            <div className={cn("space-y-4", className)}>{children}</div>
        </AccordionContext.Provider>
    );
};

export const AccordionItem = ({
    title,
    children,
    isOpen: defaultOpen = false,
    value
}: {
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    value?: string;
}) => {
    const context = React.useContext(AccordionContext);
    const itemValue = value || title;

    // Use internal state if not wrapped in an Accordion provider (fallback)
    const [isInternalOpen, setIsInternalOpen] = React.useState(defaultOpen);

    const isOpen = context ? context.openValue === itemValue : isInternalOpen;

    // Synchronize initial open state with the parent context
    React.useEffect(() => {
        if (context && defaultOpen && context.openValue === null) {
            context.toggle(itemValue);
        }
    }, [defaultOpen, context, itemValue]);

    const handleToggle = () => {
        if (context) {
            context.toggle(itemValue);
        } else {
            setIsInternalOpen(!isInternalOpen);
        }
    };

    return (
        <div className="border border-stone-200 rounded-lg bg-white/50 backdrop-blur-sm overflow-hidden transition-all duration-300">
            <button
                onClick={handleToggle}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
            >
                <span className="pr-4">{title}</span>
                <ChevronDown
                    className={cn(
                        "w-5 h-5 text-stone-400 shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out font-normal",
                    isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="p-5 pt-0 text-stone-600 leading-relaxed border-t border-stone-100/50">
                    {children}
                </div>
            </div>
        </div>
    );
};
