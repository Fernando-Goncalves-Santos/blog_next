import { formatDateTime, formatRelativeDate } from "@/utils/format-datetime";
type PostDateProps = {
    createdAt: string
}

export default function PostDate({createdAt}: PostDateProps) {
    return (
        <time
                dateTime={createdAt}
                className="text-slate-600 text-sm/tight dark:text-slate-50"
                title={formatRelativeDate(createdAt)}
              >
                {formatDateTime(createdAt)}
              </time>
    );
}