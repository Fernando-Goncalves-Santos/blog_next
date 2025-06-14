import { formatDateTime, formatRelativeDate } from "@/utils/format-datetime";
type PostDateProps = {
    createdAt: string | Date
}

export default function PostDate({createdAt}: PostDateProps) {
    return (
        <time
                dateTime={createdAt.toString()}
                className="text-slate-600 text-sm/tight dark:text-slate-50"
                title={formatRelativeDate(createdAt.toString())}
              >
                {formatDateTime(createdAt.toString())}
              </time>
    );
}