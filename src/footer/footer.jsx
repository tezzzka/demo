import './footer.css';
import ImageLogo from '../../public/assets/logo.png';
import ImageInstagram from '../../public/assets/instagram.png';
import ImageOK from '../../public/assets/odnoklassniki.png';
import ImageYoutube from '../../public/assets/youtube.png';
import ImageVK from '../../public/assets/vk.png';
import ImageDmpt from '../../public/assets/dmpt.png';
import ImageYamolod from '../../public/assets/yamolod.png';
import ImageOMC from '../../public/assets/omc.png';


export const Footer = () => {
    return (
        <div className="FooterWrapper">
            <div className="FooterLeft">
                <img src={ImageLogo} className="logoClass" />
                <div className="Social">
                    <a href="#"><img src={ImageInstagram} /></a>
                    <a href="#"><img src={ImageOK} /></a>
                    <a href="#"><img src={ImageYoutube} /></a>
                    <a href="#"><img src={ImageVK} /></a>
                </div>
            </div>
            <div className="FooterCenter">
                <span>ЯНАО, г.Салехард</span>
                <span>Чубынина 17</span>
                <span>E-mail: art.yanao@mail.ru</span>
                <span>Тел.: +7 349 22 3 92 75</span>
            </div>
            <div className="FooterRight">
                <span>Наши партнеры</span>
                <div className="Partners">
                    <a href="#"><img src={ImageDmpt} className="Image" /></a>
                    <a href="#"><img src={ImageYamolod} className="Image" /></a>
                    <a href="#"><img src={ImageOMC} className="Image" /></a>
                </div>
            </div>
            <div className="clear" />
            <div className="FooterBottom">
                <div className="copyright">&copy;2020 арт-резиденция "Полярис"</div>
                <div className="info">
                    <span className="confidential">Политика конфиденциальности</span>
                    <span className="author">Дизайн и верстка - ruyou</span>
                </div>
            </div>
            <div className="clear" />
        </div>
    )
}

