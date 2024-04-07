import { PropsWithChildren } from 'react';

type HtmlUListProps = JSX.IntrinsicElements['ul'];

interface IUListProps extends HtmlUListProps {
  customClass?: string;
}

export const UList: React.FC<IUListProps & PropsWithChildren> = ({ customClass, children, ...props }): JSX.Element => {
  return (
    <ul className={customClass} {...props}>
      {children}
    </ul>
  );
};
