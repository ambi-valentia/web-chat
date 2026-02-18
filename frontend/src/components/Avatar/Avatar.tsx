import styles from './Avatar.module.scss';

export interface Props {
  src?: string;
  size?: 'md' | 'sm';
}

export const Avatar = ({src, size = 'sm'}: Props) => {
  const isSmall = size === 'sm';

  return (
    <img
      className={styles['component-avatar']}
      data-small={isSmall}
      src={src ?? process.env.PUBLIC_URL + '/logo192.png'}
      alt="avatar"
    />
  );
};
