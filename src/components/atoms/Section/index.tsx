import { PropsWithChildren, forwardRef } from 'react';

// type HtmlSectionProps = JSX.IntrinsicElements['section'];

// interface ISectionProps extends HtmlSectionProps {
//   customClass?: string;
// }

type ISectionProps = JSX.IntrinsicElements['section'] & {customClass?: string;}

export const Section = forwardRef<HTMLElement, ISectionProps & PropsWithChildren>(
  ({ customClass, children, ...props }, ref?): JSX.Element => {
    return (
      <section ref={ref} className={customClass} {...props}>
        {children}
      </section>
    );
  }
);
