type HeadingMdProps = {
  label: string;
  additionalClasses?: string;
};

const HeadingMd = ({
  label,
  additionalClasses,
}: HeadingMdProps): JSX.Element => {
  const initClasses = ["text-gray-900 text-lg font-medium"].join(" ");

  return <div className={`${initClasses} ${additionalClasses}`}>{label}</div>;
};

export default HeadingMd;
