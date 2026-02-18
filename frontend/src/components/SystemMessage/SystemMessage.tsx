import styles from './SystemMessage.module.scss';

type Props = {
  msg: string;
};

export const SystemMessage = ({msg}: Props) => {
  return <div className={styles.msg}>{msg}</div>;
};
