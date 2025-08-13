interface FormContentHeaderProps {
  title: string;
  image?: string;
}

export const FormContentHeader = ({ title, image }: FormContentHeaderProps) => {
  return (
    <div className="border-b border-border pb-6 mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {image && (
        <div className="mt-4">
          <img 
            src={image} 
            alt={title}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
