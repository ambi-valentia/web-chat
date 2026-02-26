import classes from './Skeleton.module.scss';

type Props = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  animation?: boolean;
};

export const Skeleton = ({
  width = '100%',
  height = '100%',
  borderRadius = '16px',
  animation = true,
}: Props) => {
  return (
    <div
      className={`${classes.skeleton} ${animation ? classes.skeleton_animated : ''}`}
      style={{width, height, borderRadius}}
    ></div>
  );
};
