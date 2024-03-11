import Link from "next/link";
import Image from "next/image";

type ExistName = "Hamster"
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type Name = ExistName | string

interface AuthorsProps {
  names: Name | Name[]
}

interface AuthorProps {
  name: string,
  url: string,
  avatar?: string,
}


const existAuthors: Record<string, AuthorProps> = {
  Hamster:{
    name: "Hamster",
    url: "https://buycoffee.top",
    avatar: "https://img.buycoffee.tech/hamster-img/2024/03/9d1199806394032cf769291834848348.jpeg",
  },
};

export function Authors(props: AuthorsProps) {

  let names = props.names
  if (typeof names === 'string') {
    names = [names]
  }

  const authors = names.map((name) => {
    if (existAuthors.hasOwnProperty(name)) {
      return existAuthors[name]
    }
    return {
      name: name,
      url: "",
    }
  })

  return (
    <>
      {authors.map((author, index, array) => (
        <span key={index}>
          {author.url ? (
              <Link href={author.url} target="_blank" className={"flex items-center h-1"}>
                <img alt={"Hamster"} className={"w-4 mr-1"} src={"https://img.buycoffee.tech/hamster-img/2024/03/9d1199806394032cf769291834848348.jpeg"}></img>{author.name}
              </Link>
          ) : (
            <>{author.name}</>
          )}
          {index < array.length - 1 && "、"}
        </span>
      ))}
    </>
  )
}
