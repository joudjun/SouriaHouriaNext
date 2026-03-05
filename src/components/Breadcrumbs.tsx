import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <div className="breadcrumbs">
            {items.map((item, i) => (
                <span key={i}>
                    {i > 0 && <span className="separator">›</span>}
                    {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                    ) : (
                        <span>{item.label}</span>
                    )}
                </span>
            ))}
        </div>
    );
}
