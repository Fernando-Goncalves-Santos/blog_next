import PostHeading from "../PostHeading";
import PostDate from "../PostDate";

// Aqui eu poderia ter recebido diretamente o post como prop e usar title, excerpt, etc. no componente
// Mas isso no next é considerado uma FALHA DE SEGURANÇA, ja que, em algum momento esse componente PostSummary
// Pode se tornar um componente do lado do cliente e acabar expondo os dados de post caso eu mande o objeto inteiro pra cá
// Solução: uso de cada propriedade de post separadamente (feito aqui) OU tornar esse componente async e fazer o fetch de post aqui
type PostSummaryProps = {
    postHeading: 'h1' | 'h2';
    postLink: string,
    createdAt: string | Date,
    title: string,
    excerpt: string,
}

export default function PostSummary({postHeading, postLink, title, createdAt, excerpt}: PostSummaryProps) {
  return (
    <div className="flex flex-col gap-4 sm:justify-center">
      <PostDate createdAt={createdAt}/>
      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>
      <p className="line-clamp-2">{excerpt}</p>
    </div>
  );
}
