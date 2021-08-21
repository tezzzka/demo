import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { InitFilmsAction } from '../storage/actions';
import './Today.css';

import ImageTodayTemplate from '../../public/assets/films/Film1Today.png';

import Star from '../../public/assets/Star.png';
import Timer from '../../public/assets/timer.png';
import MapPoint from '../../public/assets/mappoint.png';
import Ruble from '../../public/assets/ruble.png';

export const _Today = (props) => {
    const [films, setFilms] = useState(props.Films.films || []);
    const [shift, setShift] = useState(0);
    const [canvasWidth, setCanvasWidth] = useState(1455);
    const [X, setX] = useState(0);

    useEffect(() => {
        films != props.Films.films ? setFilms(props.Films.films) : '';
    })
    const MoveHandler = (e, index) => {
        let fx;
        window.innerWidth < 481 ? fx = 110 : fx = 0;
        index == films.length - 1 ? setShift(0) : setShift((index + 1) * (-1) * (canvasWidth - fx));
    }
    const MoveHandlerMouse = (pozX, index) => {
        if (pozX == X) return;
        if (index == films.length - 1 && pozX < X) {
            setShift(0);
        } else {
            if (pozX < X) {
                setShift((index + 1) * -canvasWidth)
            } else {
                index != 0 ? setShift(-canvasWidth * (index - 1)) : ''
            }
        }
    }
    return (
        <>
            <div className="TodayContainer">
                <div className="TodayTop">
                    <span className="TodayTabs TodayTabsActive">Сейчас в кино</span>
                    <span className="TodayTabs">Сегодня в кино</span>
                </div>
                <div className="TodaySlider" style={{ width: films.length * canvasWidth, marginLeft: shift }}>
                    {(() => {
                        !films ? exit : '';
                        const res = [];
                        let PinkBlue = '';
                        let PinkBlueBtn = '';
                        for (const unit of films) {
                            {
                                if (unit.index % 2 == 0) { PinkBlue = 'tsShortcut tsShortcutBlue'; PinkBlueBtn = 'TodayBuy BlueBtn'; }
                                if (unit.index % 2 == 1) { PinkBlue = 'tsShortcut tsShortcutPink'; PinkBlueBtn = 'TodayBuy PinkBtn'; }
                            }
                            res.push(
                                <div key={unit.index} className="TodaySlide"
                                    onTouchMove={(e) => MoveHandler(e, unit.index)}
                                    onMouseDown={(e) => setX(e.clientX)}
                                    onMouseUp={(e) => MoveHandlerMouse(e.clientX, unit.index)}
                                >
                                    <div className={PinkBlue}><h3>{unit.nowDates}</h3></div>
                                    <div className="tsContent">
                                        <img src={unit.ImageLarge || ImageTodayTemplate} className="TodayImage" />
                                        <div className="Cover" />
                                        <div className="TodayTextContent">
                                            <div className="TodayFilmTitle">{unit.FilmName} / </div>
                                            <div className="TodayFilmTitle">{unit.AltFilmName}</div>
                                            <div className="TodayFilmContainer">
                                                <div className="TodayFilmContent TodayratingContent">
                                                    {/* <span className="fcName">рейтинг</span> */}
                                                    <div className="FilmContentSecondary">
                                                        <img className="fcPic" src={Star} />
                                                        <span>{unit.rating || ''}</span>
                                                    </div>
                                                </div>
                                                <div className="TodayFilmContent ">
                                                    {/* <span className="fcName">время сеанса</span> */}
                                                    <div className="FilmContentSecondary">
                                                        <img className="fcPic" src={Timer} />
                                                        <span>{unit.during || ''}</span>
                                                    </div>
                                                </div>
                                                <div className="TodayFilmContent TodayAddress">
                                                    {/* <span className="fcName">адрес</span> */}
                                                    <div className="FilmContentSecondary">
                                                        <img className="fcPic" src={MapPoint} />
                                                        <span>{unit.address || ''}</span>
                                                    </div>
                                                </div>
                                                <div className="TodayFilmContent ">
                                                    {/* <span className="fcName">цена</span> */}
                                                    <div className="FilmContentSecondary">
                                                        <img className="fcPic" src={Ruble} />
                                                        <span>{unit.price || ''}</span>
                                                    </div>
                                                </div>
                                                <div style={{ clear: 'left' }} />
                                                <div className={PinkBlueBtn}>купить билет</div>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                        return res;
                    })()}
                </div>
                <div style={{ clear: 'left' }} />
                {/* <div className="TodaySlider" >
                    <div className="TodaySlide">
                        <div className="tsShortcut tsShortcutBlue"><h3>18-29 февраля</h3></div>
                        <div className="tsContent">
                            <img src={ImageTodayTemplate} className="TodayImage" />
                        </div>
                    </div>
                    <div className="TodaySlide">
                        <div className="tsShortcut tsShortcutPink"><h3>18-29 февраля</h3></div>
                        <div className="tsContent">
                            <img src={ImageTodayTemplate} className="TodayImage" />
                        </div>
                    </div>
                    <div style={{ clear: 'left' }} />
                </div> */}
            </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    Films: state
});

const Today = compose(
    connect(mapStateToProps, { InitFilmsAction })
)(_Today)

export { Today }