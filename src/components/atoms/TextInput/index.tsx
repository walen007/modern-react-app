import { forwardRef, KeyboardEvent } from 'react';
import styles from './TextInput.module.scss';

type HtmlInputProps = JSX.IntrinsicElements['input'];

interface ITextInputProps extends HtmlInputProps {
  handleKeyPress?: (_event: KeyboardEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  ({ placeholder, handleKeyPress, ...props }, ref?) => {
    return (
      <input
        type="text"
        ref={ref}
        className={styles.txtSearch}
        onKeyDown={handleKeyPress}
        aria-placeholder={placeholder}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);
