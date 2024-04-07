import React from 'react';
import styles from './SuccessIndicator.module.scss';

type HtmlDivProps = JSX.IntrinsicElements['div'];

interface ISuccessIndicatorProps extends HtmlDivProps {
  isSuccess: boolean | null;
}

export const SuccessIndicator: React.FC<ISuccessIndicatorProps> = ({ isSuccess, ...props }): JSX.Element => {
  return <div className={isSuccess === true ? styles.successfulLaunch : styles.failedLaunch} {...props} />;
};
