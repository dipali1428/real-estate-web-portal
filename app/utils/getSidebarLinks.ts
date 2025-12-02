import { sidebarLinks } from "../data/sidebarLinks";

// type Role = "DSA" | "ADMIN";
export type Role = keyof typeof sidebarLinks; // "DSA" | "ADMIN"


export function getSidebarLinks(role: Role) {
    return sidebarLinks[role] ?? [] // Role specific

}
