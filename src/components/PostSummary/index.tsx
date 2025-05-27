import { formatDateTime, formatRelativeDate } from "@/utils/format-datetime";
import PostHeading from "../PostHeading";

// Aqui eu poderia ter recebido diretamente o post como prop e usar title, excerpt, etc. no componente
// Mas isso no next é considerado uma FALHA DE SEGURANÇA, ja que, em algum momento esse componente PostSummary
// Pode se tornar um componente do lado do cliente e acabar expondo os dados de post caso eu mande o objeto inteiro pra cá
// Solução: uso de cada propriedade de post separadamente (feito aqui) OU tornar esse componente async e fazer o fetch de post aqui
type PostSummaryProps = {
    postHeading: 'h1' | 'h2';
    postLink: string,
    createdAt: string,
    title: string,
    excerpt: string,
}

export default function PostSummary({postHeading, postLink, title, createdAt, excerpt}: PostSummaryProps) {
  return (
    <div className="flex flex-col gap-4 sm:justify-center">
      <time
        dateTime={createdAt}
        className="text-slate-600 block text-sm/tight dark:text-slate-50"
        title={formatRelativeDate(createdAt)}
      >
        {formatDateTime(createdAt)}
      </time>
      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
