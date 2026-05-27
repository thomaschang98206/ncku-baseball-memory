import Link from "next/link";

const links = [
  { href: "/admin", label: "後台首頁" },
  { href: "/admin/photos", label: "照片管理" },
  { href: "/admin/donations", label: "捐款紀錄" },
  { href: "/admin/settings", label: "捐款設定" },
];

export default function AdminNav() {
  return (
    <nav className="border-b border-[#D8C7B2] bg-[#F6EFE4]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <Link href="/" className="font-black text-[#421211]">
          NCKU Baseball Admin
        </Link>
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-[#7A665B]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#8E1F26]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
