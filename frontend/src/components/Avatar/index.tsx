import {FC} from 'react';
import {IAvatar} from './interface';
import './avatar.scss';

export const Avatar: FC<IAvatar> = ({src, size = 'sm'}: IAvatar) => {
  const className = `component-avatar component-avatar--${size}`;

  return (
    <img className={className} src={src ?? process.env.PUBLIC_URL + '/logo192.png'} alt="avatar" />
  );
};
