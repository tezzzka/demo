import { useEffect, useState } from 'react';
import classnames from 'classnames';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { InitFilmsAction } from '../storage/actions';

import styles from './Week.scss';
import ImageTodayTemplate from '../../public/assets/films/Film1Today.png';
import ImageSmall from '../../public/assets/films/Film1Small.png';

import Star from '../../public/assets/Star.png';
import Timer from '../../public/assets/timer.png';
import MapPoint from '../../public/assets/mappoint.png';
import Ruble from '../../public/assets/ruble.png';
import moment from 'moment';

export const _Week = (props) => {
    const [films, setFilms] = useState(props.Films.films || []);
    const [shift, setShift] = useState(0);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [X, setX] = useState(0);
    const [Visual, setVisual] = useState(0);

    useEffect(() => {
        // console.log(Visual)
        if (films != props.Films.films) {
            setFilms(props.Films.films);
        }
        Vl()
    })
    useEffect(() => {
        setVisual(Limit())
        window.addEventListener('resize', ResizeHandle)
        return () => {
            window.removeEventListener('resize', ResizeHandle);
        }

    }, [])

    const Vl = () => {
        window.innerWidth > 750 ? setCanvasWidth(1445) : setCanvasWidth(575);
    }

    const ResizeHandle = () => {
        setVisual(Limit)
        Vl()
    }

    const MoveHandler = (pozX, index) => {
        if (pozX == X) return;

        if (index == Visual - 1 && pozX < X) {
            setShift(0);
        } else {
            if (pozX < X) {
                setShift((index + 1) * -canvasWidth)
            } else {
                index != 0 ? setShift(-canvasWidth * (index - 1)) : ''
            }
        }
    }

    const Defineder = (Start, Expire) => {
        //Новое Расписание в кинотеатре создается в один день =Чт и действует по среду следующей недели включительно.
        //Определим границы, в рамках которых будет выборка данных из data.js, точнее из редакс-стора с фильтрацией в этом компоненте.
        let left, right;
        const X = moment().set({ hour: 0, minute: 0, second: 0 });
        switch (X.format('d')) {
            case '0': { left = moment(X).subtract(3, 'days'); right = moment(X).add(4, 'days').subtract(1, 'seconds'); break; }
            case '1': { left = moment(X).subtract(4, 'days'); right = moment(X).add(3, 'days').subtract(1, 'second'); break; }
            case '2': { left = moment(X).subtract(5, 'days'); right = moment(X).add(2, 'days').subtract(1, 'second'); break }
            case '3': { left = moment(X).subtract(6, 'days'); right = moment(X).subtract(1, 'second'); break; }
            case '4': { left = moment(X); right = moment(X).add(6, 'days').subtract(2, 'second'); break; }
            case '5': { left = moment(X).subtract(1, 'days'); right = moment(X).add(4, 'days').subtract(1, 'second'); break }
            case '6': { left = moment(X).subtract(2, 'days'); right = moment(X).add(3, 'days').subtract(1, 'second'); break; }
            default: return false;
        }

        if (moment(Start).isSame(moment(left).format('YYYY-MM-DDTHH:mm:ss')) ||
            moment(Start).isSame(moment(right).format('YYYY-MM-DDTHH:mm:ss')) ||
            moment(Start).isBetween(moment(left).format('YYYY-MM-DDTHH:mm:ss'), moment(right).format('YYYY-MM-DDTHH:mm:ss'))) {
            return true;
        } else { return false }
        //закончиться фильм может уже вне диапазона, а вот начаться обязан в диапазоне.    

    }

    const Limit = () => {
        if (props.period == 'today') {
            let res = 0;
            films.forEach((unit) => { if (unit.sessions) res += unit.sessions.filter(v => TodayFilter(v)).length; });
            return res;
        } else { return films.filter(v => Defineder(v.StartDate, v.ExpireDate)).length; }
    }

    const WeekView = () => {
        !films ? exit : '';
        const res = [];
        let PinkBlue = '';
        let PinkBlueBtn = '';
        // console.log(films)
        films.filter(v => Defineder(v.StartDate, v.ExpireDate)).forEach((unit, idx) => {
            if (idx % 2 == 0) { PinkBlue = classnames(styles.tsShortcut, styles.tsShortcutBlue); PinkBlueBtn = classnames(styles.Buy, styles.BlueBtn); }
            if (idx % 2 == 1) { PinkBlue = classnames(styles.tsShortcut, styles.tsShortcutPink); PinkBlueBtn = classnames(styles.Buy, styles.PinkBtn); }
            res.push(
                <div className={styles.Slide} key={idx}
                    onTouchStart={(e) => setX(e.touches[0].clientX)}
                    onTouchEnd={(e) => MoveHandler(e.changedTouches[0].clientX, idx)}
                    onMouseDown={(e) => setX(e.clientX)}
                    onMouseUp={(e) => MoveHandler(e.clientX, idx)}
                >
                    <div className={PinkBlue}><h3>{unit.nowDates}</h3></div>
                    <div className={styles.tsContent}>
                        <img src={window.innerWidth > 750 ? (unit.ImageLarge || ImageTodayTemplate) : (unit.ImageSmall || ImageSmall)} className={styles.Image} />
                        <div className={styles.Cover} />
                        <div className={styles.TextContent}>
                            <div className={styles.FilmTitle}>{unit.FilmName} / </div>
                            <div className={styles.FilmTitle}>{unit.AltFilmName}</div>
                            <div className={styles.FilmContainer}>
                                <div className={classnames(styles.FilmContent, styles.ratingContent)}>
                                    {/* <span className="fcName">рейтинг</span> */}
                                    <div className={styles.FilmContentSecondary}>
                                        <img className={styles.fcPic} src={Star} />
                                        <span>{unit.rating || ''}</span>
                                    </div>
                                </div>
                                <div className={styles.FilmContent}>
                                    {/* <span className="fcName">время сеанса</span> */}
                                    <div className={styles.FilmContentSecondary}>
                                        <img className={styles.fcPic} src={Timer} />
                                        <span>{unit.during || ''}</span>
                                    </div>
                                </div>
                                <div className={classnames(styles.FilmContent, styles.Address)}>
                                    {/* <span className="fcName">адрес</span> */}
                                    <div className={styles.FilmContentSecondary}>
                                        <img className={styles.fcPic} src={MapPoint} />
                                        <span>{unit.address || ''}</span>
                                    </div>
                                </div>
                                <div className={styles.FilmContent}>
                                    {/* <span className="fcName">цена</span> */}
                                    <div className={styles.FilmContentSecondary}>
                                        <img className={styles.fcPic} src={Ruble} />
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
        })
        return res;
    }

    const TodayFilter = (Ob) => {
        const today = moment().set({ hour: 0, minute: 0, second: 0 });
        return moment(Ob.DateTime).format("YYYY-MM-DDT00:00:00") == moment(today).format("YYYY-MM-DDT00:00:00");
    }

    const TodayView = () => {
        !films ? exit : '';
        const res = [];
        let PinkBlue = '';
        let PinkBlueBtn = '';
        let color;
        films.forEach((unit, ids) => {
            if (unit.sessions) {
                unit.sessions.filter(v => TodayFilter(v)).forEach((subunit, idx) => {
                    if (color) {
                        PinkBlue = classnames(styles.tsShortcut, styles.tsShortcutBlue); PinkBlueBtn = classnames(styles.Buy, styles.BlueBtn);
                    } else { PinkBlue = classnames(styles.tsShortcut, styles.tsShortcutPink); PinkBlueBtn = classnames(styles.Buy, styles.PinkBtn); }

                    res.push(
                        <div className={styles.Slide} key={ids}
                            onTouchStart={(e) => setX(e.touches[0].clientX)}
                            onTouchEnd={(e) => MoveHandler(e.changedTouches[0].clientX, parseInt(e.target.id))}
                            onMouseDown={(e) => setX(e.clientX)}
                            onMouseUp={(e) => MoveHandler(e.clientX, parseInt(e.target.id))}
                        >
                            <div className={PinkBlue}><h3>{moment(subunit.DateTime).format("HH:mm")}</h3></div>
                            <div className={styles.tsContent}>
                                <img src={window.innerWidth > 750 ? (unit.ImageLarge || ImageTodayTemplate) : (unit.ImageSmall || ImageSmall)} className={styles.Image} />
                                <div className={styles.Cover} />
                                <div className={styles.SwipeTransparent} id={res.length} />
                                <div className={styles.TextContent}>
                                    <div className={styles.FilmTitle}>{unit.FilmName} / </div>
                                    <div className={styles.FilmTitle}>{unit.AltFilmName}</div>
                                    <div className={styles.FilmContainer}>
                                        <div className={classnames(styles.FilmContent, styles.ratingContent)}>
                                            {/* <span className="fcName">рейтинг</span> */}
                                            <div className={styles.FilmContentSecondary}>
                                                <img className={styles.fcPic} src={Star} />
                                                <span>{unit.rating || ''}</span>
                                            </div>
                                        </div>
                                        <div className={styles.FilmContent}>
                                            {/* <span className="fcName">время сеанса</span> */}
                                            <div className={styles.FilmContentSecondary}>
                                                <img className={styles.fcPic} src={Timer} />
                                                <span>{unit.during || ''}</span>
                                            </div>
                                        </div>
                                        <div className={classnames(styles.FilmContent, styles.Address)}>
                                            {/* <span className="fcName">адрес</span> */}
                                            <div className={styles.FilmContentSecondary}>
                                                <img className={styles.fcPic} src={MapPoint} />
                                                <span>{unit.address || ''}</span>
                                            </div>
                                        </div>
                                        <div className={styles.FilmContent}>
                                            {/* <span className="fcName">цена</span> */}
                                            <div className={styles.FilmContentSecondary}>
                                                <img className={styles.fcPic} src={Ruble} />
                                                <span>{unit.price || ''}</span>
                                            </div>
                                        </div>
                                        <div style={{ clear: 'left' }} />
                                        <div className={PinkBlueBtn}>купить билет</div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                    color = !color;
                });
            }
        })
        return res;
    }

    if (props.period == 'week') {
        return (
            <>
                <div className={styles.Container}>
                    <div className={styles.Top}>
                        <a href="/#/"><span className={classnames(styles.Tabs, styles.TabsActive)}>Сейчас в кино</span></a>
                        <a href="/#/today"><span className={styles.Tabs}>Сегодня в кино</span></a>
                    </div>
                    <div className={styles.Slider} style={{ width: Visual * canvasWidth, marginLeft: shift }}>
                        {(() => WeekView())()}
                    </div>
                    <div style={{ clear: 'left' }} />
                </div>
            </>
        )
    } else if (props.period == 'today') {
        return (
            <>
                <div className={styles.Container}>
                    <div className={styles.Top}>
                        <a href="/#/"><span className={styles.Tabs}>Сейчас в кино</span></a>
                        <a href="/#/today"><span className={classnames(styles.Tabs, styles.TabsActive)}>Сегодня в кино</span></a>
                    </div>
                    <div className={styles.Slider} style={{ width: Visual * canvasWidth, marginLeft: shift }}>
                        {(() => TodayView())()}
                    </div>
                    <div style={{ clear: 'left' }} />
                </div>
            </>
        )

    } else { console.log('smt wrong.'); return; }
}
const mapStateToProps = (state) => ({
    Films: state
});

const Week = compose(
    connect(mapStateToProps, { InitFilmsAction })
)(_Week)

export { Week }