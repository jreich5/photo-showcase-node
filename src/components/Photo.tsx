interface PhotoProps {
  id: number;
  title: string;
  url: string;
}

const Photo = (props: PhotoProps) => {
  const { id, title, url } = props;
  return (
    <article
      className={[
        "border",
        "border-spacing-0",
        "border-1",
        "p-3",
        "rounded",
      ].join(" ")}
    >
      <img className="w-full grayscale-[50%]" src={url} alt={title} />
      <p>
        <span className="font-bold">Id:</span> {id}
      </p>
      <p>
        <span className="font-bold">Title</span>
        <br />
        {title}
      </p>
    </article>
  );
};

export default Photo;
