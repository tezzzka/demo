import { useEffect, useState } from 'react';
import styles from './Symbolica.scss';

import Flash from '../../public/assets/Symbolica/Flash.png';
import Ya from '../../public/assets/Symbolica/Ya.png';
import Crystal from '../../public/assets/Symbolica/Crystal.png';
import Chum from '../../public/assets/Symbolica/Chum.png';
import Spruce from '../../public/assets/Symbolica/Spruce.png';
import Eye from '../../public/assets/Symbolica/Eye.png';
import Round from '../../public/assets/Symbolica/Round.png';
import Strange from '../../public/assets/Symbolica/Strange.png';
import Stars from '../../public/assets/Symbolica/Stars.png';
import Flake from '../../public/assets/Symbolica/Flake.png';
import Balls from '../../public/assets/Symbolica/Balls.png';
import Crosses from '../../public/assets/Symbolica/Crosses.png';
import Arrow from '../../public/assets/Symbolica/Arrow.png';
import Smile from '../../public/assets/Symbolica/Smile.png';
import Stairs from '../../public/assets/Symbolica/Stairs.png';
import Cross from '../../public/assets/Symbolica/Cross.png';
import Topping from '../../public/assets/Symbolica/Topping.png';
export const Symbolica = (props) => {

    return (
        <>
            <div className={styles.Container}>
                <img className={styles.Wide} src={Flash} />
                <img className={styles.Narrow} src={Ya} />
                <img className={styles.Narrow} src={Crystal} />
                <img className={styles.Narrow} src={Chum} />
                <img className={styles.Wide} src={Eye} />
                <img className={styles.Narrow} src={Round} />
                <img className={styles.Narrow} src={Strange} />
                <img className={styles.Narrow} src={Stars} />
                <img className={styles.Narrow} src={Spruce} />
                <img className={styles.Narrow} src={Flake} />
                <img className={styles.Narrow} src={Balls} />
                <img className={styles.Narrow} src={Crosses} />
                <img className={styles.Narrow} src={Arrow} />
                <img className={styles.Narrow} src={Smile} />
                <img className={styles.Narrow} src={Stairs} />
                <img className={styles.Narrow} src={Cross} />
                <img className={styles.Wide} src={Topping} />
            </div>
        </>
    )

}


