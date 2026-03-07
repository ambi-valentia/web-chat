import {createPortal} from 'react-dom';
import styles from './Popup.module.scss';

export const Popup = ({
  isVisible = false,
  onClick,
}: {
  isVisible?: boolean;
  onClick?: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <>
      {createPortal(
        <div className={styles.popup}>
          <img
            src={`${process.env.PUBLIC_URL}/sleepy.png`}
            alt="An image of a sleepy server"
            className={styles.image}
          />
          <p>
            Hey, *username*! I might be a bit shleepy right now... <br /> Please, wait for me to
            wake up and enjoy <br /> the chatting. Thanks!
          </p>
          <button className={styles.okayButton} onClick={onClick}>
            Okay<span>!</span>
          </button>
        </div>,
        document.body
      )}
    </>
  );
};
