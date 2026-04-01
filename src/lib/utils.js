/**
 * Utility: cn()
 * Merges class names, filtering out falsy values.
 * Drop-in compatible with shadcn/ui pattern.
 */
export function cn(...classes) {
    return classes
        .flat()
        .filter(Boolean)
        .join(" ");
}
