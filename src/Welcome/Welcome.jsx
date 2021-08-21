import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { InitFilmsAction } from '../storage/actions';
import './Welcome.css';

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
    const [largeImage, setLargeImage] = useState('');
    const [smallImage, setSmallImage] = useState('');

    const [films, setFilms] = useState(props.Films.films || []);
    const [current, setCurrent] = useState(0);

    const LImageHandler = () => {
        console.log(current)
        window.innerWidth < 480 ?
            setLargeImage(smallImage || ImageSmall) : setLargeImage(largeImage || ImageLarge);
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
    }, [])
    useEffect(() => {
        films != props.Films.films ? (setFilms(props.Films.films), Changer(0)) : '';
    })
    const Changer = (cur) => {
        setCurrent(props.Films.films[cur].index);
        window.innerWidth < 480 ?
            setLargeImage(props.Films.films[cur].ImageSmall || ImageSmall) :
            setLargeImage(props.Films.films[cur].ImageLarge || ImageLarge);
        setSmallImage(props.Films.films[cur].ImageSmall || ImageSmall);
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
    const TrailerBoxOpen = () => {
        document.getElementById("TrailerModalId").className += " TrailerModalOpened";
    }
    const TrailerBoxClose = () => {
        document.getElementById("TrailerModalId").className = "TrailerModal";
    }

    return (
        <>
            <div id="TrailerModalId" className="TrailerModal">
                <img id="Cancel" src={Cancel} onClick={() => TrailerBoxClose()} />
                <YouTube videoId={films[current] ? films[current].TrailerLink : ''} className="youtube" />
            </div>
            <div className="WrapperWelcome">
                <div className="WrapperWelcomeTop" id="Splash" onTouchStart={(evt) => handleTouchStart(evt)} onTouchMove={(evt) => handleTouchMove(evt)}>
                    <div className="WrapperWelcomeTopLeft">
                        <img className="logomain" src={ImageLogo} />
                        <span className="SocialMobile">
                            <a href="#" className="socialLinks"><img src={ImageInstagram} /></a>
                            <a href="#" className="socialLinks"><img src={ImageOK} /></a>
                            <a href="#" className="socialLinks"><img src={ImageYoutube} /></a>
                            <a href="#" className="socialLinks"><img src={ImageVK} /></a>
                        </span>
                        <span id="Trailer" className="textWelcome TrailerBox" onClick={() => TrailerBoxOpen()}>смотреть трейлер</span>
                        <img className="FilmImage fiPrimary" src={largeImage} />
                    </div>
                    <div className="WrapperWelcomeTopRight">
                        <span className="SocialMain">
                            <a href="#" className="socialLinks"><img src={ImageInstagram} /></a>
                            <a href="#" className="socialLinks"><img src={ImageOK} /></a>
                            <a href="#" className="socialLinks"><img src={ImageYoutube} /></a>
                            <a href="#" className="socialLinks"><img src={ImageVK} /></a>
                        </span>
                        <img className="FilmImage fiSecondary" src={smallImage} />
                    </div>
                </div>
                <div className="WrapperWelcomeBottom">
                    <div className="WrapperWelcomeBottomLeft">
                        <div className="FilmTitle">{films[current] ? films[current].FilmName : ''} /</div>
                        <div className="FilmTitle">{films[current] ? films[current].AltFilmName : ''}</div>
                        <div className="FilmContainer">
                            <div className="FilmCounter">
                                <img className="ArrowSecondary" src={ArrowLeft} style={{ marginRight: '14px' }} />
                                <span className="FilmCounterCurrent">{current + 1}</span>
                                <span className="delim">/</span>
                                <span className="FilmCounterTotal">{films.length}</span>
                                <img className="ArrowSecondary" src={ArrowRight} style={{ marginLeft: '14px' }} />
                            </div>
                            <div className="FilmContainer">
                                <div className="FilmContent ratingContent">
                                    <span className="fcName">рейтинг</span>
                                    <div className="FilmContentSecondary">
                                        <img className="fcPic" src={Star} />
                                        <span className="fcValue">{films[current] ? films[current].rating : ''}</span>
                                    </div>
                                </div>
                                <div className="FilmContent ">
                                    <span className="fcName">время сеанса</span>
                                    <div className="FilmContentSecondary">
                                        <img className="fcPic" src={Timer} />
                                        <span className="fcValue">{films[current] ? films[current].during : ''}</span>
                                    </div>
                                </div>
                                <div className="FilmContent ">
                                    <span className="fcName">адрес</span>
                                    <div className="FilmContentSecondary">
                                        <img className="fcPic" src={MapPoint} />
                                        <span className="fcValue">{films[current] ? films[current].address : ''}</span>
                                    </div>
                                </div>
                                <div className="FilmContent ">
                                    <span className="fcName">цена</span>
                                    <div className="FilmContentSecondary">
                                        <img className="fcPic" src={Ruble} />
                                        <span className="fcValue">{films[current] ? films[current].price : ''}</span>
                                    </div>
                                </div>

                                <div className="FilmContent arrows">
                                    <img onClick={() => MovieHandler(false)} className="ArrowPrimary" src={ArrowLeft} style={{ marginRight: '14px' }} />
                                    <img onClick={() => MovieHandler(true)} className="ArrowPrimary" src={ArrowRight} />
                                    <img className="BasketSecondary" src={Basket} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="WrapperWelcomeBottomRight">
                        <img className="Basket" src={Basket} />
                        <span className="textWelcome Buy">купить билет</span>
                    </div>
                </div>
                <div className="MobileBuy">
                    <span className="textWelcome">купить билет</span>
                </div>
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