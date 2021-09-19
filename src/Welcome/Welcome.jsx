import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { InitFilmsAction } from '../storage/actions';
import classnames from 'classnames';

// import './Welcome.css';
import styles from './Welcome.scss';

import YouTube from 'react-youtube';

import ImageLarge from '../../public/assets/films/Film1.png';
import ImageSmall from '../../public/assets/films/Film1Small.png';

import ImageLogo from '../../public/assets/logo.png';
import Basket from '../../public/assets/basket.png';

import ImageInstagram from '../../public/assets/instagram.png';
import ImageOK from '../../public/assets/odnoklassniki.png';
import ImageYoutube from '../../public/assets/youtube.png';
import ImageVK from '../../public/assets/vk.png';

import Star from '../../public/assets/Star.png';
import Timer from '../../public/assets/timer.png';
import MapPoint from '../../public/assets/mappoint.png';
import Ruble from '../../public/assets/ruble.png';
import ArrowLeft from '../../public/assets/ArrowLeft.png';
import ArrowRight from '../../public/assets/ArrowRight.png';
import Cancel from '../../public/assets/cancel.png';

export const _Welcome = (props) => {
    const [showTrailer, setShowTrailer] = useState(false)
    const [largeImage, setLargeImage] = useState('');
    const [smallImage, setSmallImage] = useState('');

    const [films, setFilms] = useState(props.Films.films || []);
    const [current, setCurrent] = useState(0);

    const LImageHandler = () => {
        // console.log(current)
        // window.innerWidth < 480 ?
        //     setLargeImage(smallImage || ImageSmall) : setLargeImage(largeImage || ImageLarge);
    }

    var xDown = null;
    var yDown = null;

    const getTouches = (evt) => {
        return evt.touches ||
            evt.originalEvent.touches;
    }
    const handleTouchStart = (evt) => {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    const handleTouchMove = (evt) => {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            xDiff > 0 ? MovieHandler(false) : MovieHandler(true);
        }

        xDown = null;
        yDown = null;
    };

    useEffect(() => {
        window.addEventListener('resize', LImageHandler);
        return () => {
            window.removeEventListener('resize', LImageHandler);
        }
    }, [])
    useEffect(() => {
        if (films != props.Films.films) {
            setFilms(props.Films.films);
            Changer(0);
        }
        // films != props.Films.films ? (setFilms(props.Films.films), Changer(0)) : '';
    })
    const Changer = (cur) => {
        setCurrent(props.Films.films[cur].index);
        setLargeImage(props.Films.films[cur].ImageLarge || ImageLarge);
        setSmallImage(props.Films.films[cur].ImageSmall || ImageSmall);
        // window.innerWidth < 480 ?
        //     setLargeImage(props.Films.films[cur].ImageSmall || ImageSmall) :
        //     setLargeImage(props.Films.films[cur].ImageLarge || ImageLarge);
        // setSmallImage(props.Films.films[cur].ImageSmall || ImageSmall);
    }
    const MovieHandler = (bool) => {
        if (bool && current == films.length - 1) {
            Changer(0)
        } else if (!bool && current == 0) {
            Changer(films.length - 1)
        } else {
            bool ? Changer(current + 1) : Changer(current - 1);
        }
    }

    return (
        <>
            <div id="TrailerModalId" className={classnames(styles.TrailerModal, showTrailer ? styles.TrailerModalOpened : '')}>
                <img id={styles.Cancel} src={Cancel} onClick={() => { setShowTrailer(false) }} />
                <YouTube videoId={films[current] ? films[current].TrailerLink : ''} className={styles.youtube} />
            </div>
            <div className={styles.Wrapper}>
                <div className={styles.Top} id="Splash" onTouchStart={(evt) => handleTouchStart(evt)} onTouchMove={(evt) => handleTouchMove(evt)}>
                    <div className={styles.TopLeft}>
                        <img className={styles.logomain} src={ImageLogo} />
                        <span className={styles.SocialMobile}>
                            <a href="#" className={styles.socialLinks}><img src={ImageInstagram} /></a>
                            <a href="#" className={styles.socialLinks}><img src={ImageOK} /></a>
                            <a href="#" className={styles.socialLinks}><img src={ImageYoutube} /></a>
                            <a href="#" className={styles.socialLinks}><img src={ImageVK} /></a>
                        </span>
                        <span id="Trailer" className={styles.TrailerBox} onClick={() => { setShowTrailer(true) }}>смотреть трейлер</span>
                        <img className={styles.fiPrimary} src={largeImage} />
                    </div>
                    <div className={styles.TopRight}>
                        <span className={styles.SocialMain}>
                            <a href="#" className={styles.socialLinks}><img className={styles.socialimg} src={ImageInstagram} /></a>
                            <a href="#" className={styles.socialLinks}><img className={styles.socialimg} src={ImageOK} /></a>
                            <a href="#" className={styles.socialLinks}><img className={styles.socialimg} src={ImageYoutube} /></a>
                            <a href="#" className={styles.socialLinks}><img className={styles.socialimg} src={ImageVK} /></a>
                        </span>
                        <img className={styles.fiSecondary} src={smallImage} />
                    </div>
                </div>
                <div className={styles.Bottom}>
                    <div className={styles.BottomLeft}>
                        <div className={styles.FilmTitle}>{films[current] ? films[current].FilmName : ''} /</div>
                        <div className={styles.FilmTitle}>{films[current] ? films[current].AltFilmName : ''}</div>
                        <div className={styles.FilmContainer}>
                            <div className={styles.FilmCounter}>
                                <img className={styles.ArrowSecondary} src={ArrowLeft} style={{ marginRight: '14px' }} />
                                <span className={styles.FilmCounterCurrent}>{current + 1}</span>
                                <span className={styles.delim}>/</span>
                                <span className={styles.FilmCounterTotal}>{films.length}</span>
                                <img className={styles.ArrowSecondary} src={ArrowRight} style={{ marginLeft: '14px' }} />
                            </div>
                            <div className={styles.FilmContainer}>
                                <div className={`${styles.FilmContent} ${styles.ratingContent}`}>
                                    <span className={styles.fcName}>рейтинг</span>
                                    <div className={styles.FilmContentSecondary}>
                                        <img className={styles.fcPic} src={Star} />
                                        <span className={styles.fcValue}>{films[current] ? films[current].rating : ''}</span>
                                    </div>
                                </div>
                                <div className={styles.FilmContent}>
                                    <span className={styles.fcName}>время сеанса</span>
                                    <div className={styles.FilmContentSecondary}>
                                        <img className={styles.fcPic} src={Timer} />
                                        <span className={styles.fcValue}>{films[current] ? films[current].during : ''}</span>
                                    </div>
                                </div>
                                <div className={`${styles.FilmContent} ${styles.address}`}>
                                    <span className={styles.fcName}>адрес</span>
                                    <div className={styles.FilmContentSecondary}>
                                        <img className={styles.fcPic} src={MapPoint} />
                                        <span className={styles.fcValue}>{films[current] ? films[current].address : ''}</span>
                                    </div>
                                </div>
                                <div className={styles.FilmContent}>
                                    <span className={styles.fcName}>цена</span>
                                    <div className={styles.FilmContentSecondary}>
                                        <img className={styles.fcPic} src={Ruble} />
                                        <span className={styles.fcValue}>{films[current] ? films[current].price : ''}</span>
                                    </div>
                                </div>

                                <div className={`${styles.FilmContent} ${styles.arrows}`}>
                                    <img onClick={() => MovieHandler(false)} className={styles.ArrowPrimary} src={ArrowLeft} style={{ marginRight: '14px' }} />
                                    <img onClick={() => MovieHandler(true)} className={styles.ArrowPrimary} src={ArrowRight} />
                                    {/* <img className={styles.BasketSecondary} src={Basket} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.BottomRight}>
                        <img className={styles.Basket} src={Basket} />
                        <span className={`${styles.textWelcome} ${styles.Buy}`}>купить билет</span>
                    </div>
                </div>

                <div className={styles.MobileBuy}>
                    <img className={styles.BasketSecondary} src={Basket} />
                </div>
                <YouTube videoId={films[current] ? films[current].TrailerLink : ''} className={styles.youtubeMobile} />
            </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    Films: state
});

const Welcome = compose(
    connect(mapStateToProps, { InitFilmsAction })
)(_Welcome)

export { Welcome }