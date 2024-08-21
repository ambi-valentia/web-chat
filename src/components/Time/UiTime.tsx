import { FC } from "react";
import { ReactComponent as Check } from "../../assets/Check.svg";
import classes from './UiTime.module.scss'

interface TimeProps {
  time: string;
  my: boolean;
}

export const Time: FC<TimeProps> = ({ time, my }: TimeProps) => {
  return (
    <div className={classes.time}>
      {time}
      {my && <Check className={classes.check} />}
    </div>
  );
};
