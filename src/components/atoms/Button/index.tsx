import { PropsWithChildren } from 'react';
import styles from './Button.module.scss';

type HtmlButtonProps = JSX.IntrinsicElements['button'];

export interface IButtonProps extends HtmlButtonProps {
  isFetching?: boolean;
}

export const Button: React.FC<IButtonProps & PropsWithChildren> = ({ isFetching, children, ...props }): JSX.Element => {
  return (
    <button
      className={styles.btnSearch}
      aria-busy={isFetching}
      aria-disabled={isFetching}
      disabled={isFetching}
      {...props}
    >
      {children}
    </button>
  );
};
