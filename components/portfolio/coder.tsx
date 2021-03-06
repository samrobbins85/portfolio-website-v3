import Image from "next/image";

export default function Coder({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-x-2" key={username}>
      <div className="inline-block h-10 w-10 relative">
        <Image
          className="rounded-full"
          src={`https://github.com/${username}.png`}
          alt={username}
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <p>{name}</p>
        <a
          className="text-radix-blue11 hover:underline"
          href={`https://github.com/${username}`}
        >
          <p>{username}</p>
        </a>
      </div>
    </div>
  );
}
