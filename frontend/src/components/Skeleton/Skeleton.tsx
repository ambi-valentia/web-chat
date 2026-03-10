import classes from './Skeleton.module.scss';

type Props = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  animation?: boolean;
};

export const Skeleton = ({width, height, borderRadius, animation = true}: Props) => {
  return (
    <div
      className={`${classes.skeleton} ${animation ? classes.skeleton_animated : ''}`}
      style={{width, height, borderRadius}}
    ></div>
  );
};
