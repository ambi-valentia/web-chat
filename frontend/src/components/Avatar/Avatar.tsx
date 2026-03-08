import styles from './Avatar.module.scss';

export interface Props {
  src?: string;
  size?: 'md' | 'sm' | 'lg';
}

export const Avatar = ({src, size = 'sm'}: Props) => {
  return (
    <img
      className={styles['component-avatar'] + ` ${styles[`component-avatar--${size}`]}`}
      src={src ?? process.env.PUBLIC_URL + '/logo192.png'}
      alt="avatar"
    />
  );
};
