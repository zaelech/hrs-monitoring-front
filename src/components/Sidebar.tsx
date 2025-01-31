import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/../app/i18n/client";

interface MenuSubItem {
    title: string;
    href: string;
}

interface MenuItem {
    title: string;
    items?: MenuSubItem[];
}

interface SidebarProps {
    lng: string;
}

const menuItems: MenuItem[] = [
    {
        title: "project",
        items: [
            { title: "sip", href: "/sip/edit" },
            { title: "tender", href: "/tender" },
            { title: "contract", href: "/contracts/edit" },
        ],
    },
    {
        title: "partners",
        items: [
            { title: "partner", href: "/partners" },
            { title: "overview", href: "/partners/overview" },
        ],
    },
    {
        title: "dev",
        items: [{ title: "prospection", href: "/dev/prospection" }],
    },
    {
        title: "administration",
        items: [
            { title: "userManagement", href: "/admin/users" },
            { title: "partnerManagement", href: "/admin/partners" },
            { title: "projectManagement", href: "/admin/projects" },
        ],
    },
];

const Sidebar = ({ lng }: SidebarProps) => {
    const { data: session } = useSession();
    const { t } = useTranslation(lng, "common");
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ 
            redirect: false
        });
        router.push(`/${lng}/login`);
        router.refresh();
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 fixed left-0 top-12 bottom-0 flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-4">
                    {menuItems.map((section, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex items-center gap-2 p-2 bg-[#FFE5CC] rounded-lg text-[#FF6600] font-medium">
                                <span>{t(section.title)}</span>
                                <ChevronDown className="h-4 w-4" />
                            </div>
                            {section.items && (
                                <div className="ml-2 pl-2 border-l-2 border-gray-100 space-y-1">
                                    {section.items.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/${lng}${item.href}`}
                                            className="block w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            <span>{t(item.title)}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {session && (
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-between p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                        <div className="flex items-center space-x-2">
                            <LogOut size={16} className="text-gray-500 group-hover:text-[#FF6600]" />
                            <span className="text-sm font-medium group-hover:text-[#FF6600]">{t("logout")}</span>
                        </div>
                        <span className="text-sm text-gray-400">{session.user?.name || "Utilisateur"}</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
