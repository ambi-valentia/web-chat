import {ReactComponent as Check} from '../../assets/Check.svg';
import styles from './Time.module.scss';

type Props = {
  time: string;
  my: boolean;
};

export const Time = ({time, my}: Props) => {
  return (
    <div className={styles.time}>
      {time}
      {my && <Check className={styles.check} />}
    </div>
  );
};
