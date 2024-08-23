export const SectionTitle = ({
  title,
  para,
}: {
  title: string;
  para?: string;
}) => {
  return (
    <div>
      <h2 className="text-black sm:text-3xl text-2xl font-semibold">{title}</h2>
      {para && <p className="mt-3 text-neutral-700 max-sm:text-sm sm:max-w-[50%]">{para}</p>}
    </div>
  );
};
