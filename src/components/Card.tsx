import Link from "next/link";

interface CardProps {
    href: string;
    image: string;
    category: string;
    title: string;
    excerpt?: string;
    date?: string;
    dateBadge?: { day: string; month: string; year?: string };
    badge?: string;
}

export default function Card({
    href,
    image,
    category,
    title,
    excerpt,
    date,
    dateBadge,
    badge,
}: CardProps) {
    return (
        <Link href={href} className="card">
            <div
                className="card-thumbnail"
                style={{ backgroundImage: `url('${image}')` }}
            >
                {badge && <span className="card-badge">{badge}</span>}
                {dateBadge && (
                    <div className="date-badge">
                        <span className="date-badge-day">{dateBadge.day}</span>
                        <span className="date-badge-month">
                            {dateBadge.month}
                        </span>
                        {dateBadge.year && (
                            <span className="date-badge-year">{dateBadge.year}</span>
                        )}
                    </div>
                )}
            </div>
            <div className="card-body">
                <span className="card-category">{category}</span>
                <h3 className="card-title">{title}</h3>
                {excerpt && <p className="card-excerpt">{excerpt}</p>}
                {date && <span className="card-date">{date}</span>}
            </div>
        </Link>
    );
}
