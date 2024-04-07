import { PropsWithChildren } from 'react';
import styles from './Heading.module.scss';

type HtmlHeadingProps = React.ClassAttributes<HTMLHeadingElement> & React.HTMLAttributes<HTMLHeadingElement>;

interface IHeadingProps extends HtmlHeadingProps {
  HeadingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  customClass?: string;
}

export const Heading: React.FC<IHeadingProps & PropsWithChildren> = ({
  HeadingTag = 'h2',
  customClass,
  children,
  ...props
}): JSX.Element => {
  return (
    <HeadingTag className={`${styles.heading}${customClass ? ' ' + customClass : ''}`} {...props}>
      {children}
    </HeadingTag>
  );
};
