import { PropsWithChildren } from 'react';

type HtmlListItemProps = JSX.IntrinsicElements['li'];

interface IListItemProps extends HtmlListItemProps {
  customClass?: string;
}

export const ListItem: React.FC<IListItemProps & PropsWithChildren> = ({
  customClass,
  children,
  ...props
}): JSX.Element => {
  return (
    <li className={customClass} {...props}>
      {children}
    </li>
  );
};
