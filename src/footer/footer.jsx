import classnames from 'classnames';

import ImageLogo from '../../public/assets/logo.png';
import ImageInstagram from '../../public/assets/instagram.png';
import ImageOK from '../../public/assets/odnoklassniki.png';
import ImageYoutube from '../../public/assets/youtube.png';
import ImageVK from '../../public/assets/vk.png';
import ImageDmpt from '../../public/assets/dmpt.png';
import ImageYamolod from '../../public/assets/yamolod.png';
import ImageOMC from '../../public/assets/omc.png';
import styles from './footer.scss';

export const Footer = () => {
    return (
        <>
            <div className={styles.FooterWrapper}>
                <div className={styles.FooterLeft}>
                    <img src={ImageLogo} className={styles.logoClass} />
                    <div className={styles.Social}>
                        <a href="#"><img src={ImageInstagram} /></a>
                        <a href="#"><img src={ImageOK} /></a>
                        <a href="#"><img src={ImageYoutube} /></a>
                        <a href="#"><img src={ImageVK} /></a>
                    </div>
                </div>
                <div className={styles.FooterCenter}>
                    <div>ЯНАО, г.Салехард</div>
                    <div>Чубынина 17</div>
                    <div className={styles.sign}>E-mail: art.yanao@mail.ru</div>
                    <div>Тел.: +7 349 22 3 92 75</div>
                </div>
                <div className={styles.FooterRight}>
                    <div className={styles.signPartners}>Наши партнеры</div>
                    <div className={styles.Partners}>
                        <a href="#"><img src={ImageDmpt} className={styles.BigPartner} /></a>
                        <a href="#"><img src={ImageYamolod} /></a>
                        <a href="#"><img src={ImageOMC} /></a>
                    </div>

                </div>
                <div className="clear" />
            </div>

        </>
    )
}

