import React, { FC } from "react";
import { IPage } from "../../interface/page";
import { Chats, Header } from "../../components";
import classes from "./page.module.scss";

export const PageIndex: FC<IPage> = (props: IPage) => {
  const { title } = props;

  return (
    <>
      <Header title={title} />
      <div className={classes.body}>
        <Chats />
        <div className={classes.chatWindow}></div>
      </div>
    </>
  );
};
