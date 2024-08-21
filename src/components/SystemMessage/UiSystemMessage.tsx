import { FC } from "react";
import classes from './UiSystemMessage.module.scss'

interface SystemMessageProps {
  msg: string;
}

export const SystemMessage: FC<SystemMessageProps> = ({
  msg,
}: SystemMessageProps) => {
  return <div className={classes.msg}>{msg}</div>;
};
