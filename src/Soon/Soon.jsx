import { useEffect, useState } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { InitFilmsAction } from '../storage/actions';

import styles from './Soon.scss';
import ImageSmall from '../../public/assets/films/Film1Small.png';

import moment from 'moment';

export const _Soon = (props) => {
    const [films, setFilms] = useState(props.Films.films || []);
    const [shift, setShift] = useState(0);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [Visual, setVisual] = useState(0);
    const [X, setX] = useState(0);
    const [curIdx, setCurIdx] = useState(0);

    useEffect(() => {
        if (films != props.Films.films) {
            setFilms(props.Films.films);
            setVisual(Limit())

        }
        const Lim = Limit();
        setVisual(Lim)

        if (Visual) {
            setTimeout(() => {
                if (curIdx == Visual - 2) {
                    setShift(0);
                    setCurIdx(0);
                } else {
                    setShift(curIdx * -canvasWidth)
                    setCurIdx(curIdx + 1)
                }
            }, 1000);

        }

    })
    useEffect(() => {
        ResizeHandle();
        window.addEventListener('resize', ResizeHandle)
        return () => {
            window.removeEventListener('resize', ResizeHandle);
        }
    }, [])

    const Canvas = () => {
        if (window.innerWidth > 1024) {
            setCanvasWidth(445)
        } else if (window.innerWidth > 750 && window.innerWidth >= 1024) {
            setCanvasWidth(405)
        } else {
            setCanvasWidth(365);
        }
    }

    const ResizeHandle = () => {
        setVisual(Limit)
        Canvas()
    }

    const MoveHandler = (pozX, index) => {
        if (pozX == X) return;
        // setCurIdx(index);

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
    const AutoMoveHandler = (e) => {
        // console.log(e)
    }

    const Defineder = (Start) => {
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

        if (moment(Start).isAfter(moment(right).format('YYYY-MM-DDTHH:mm:ss'))) {
            return true;
        } else { return false }
        //закончиться фильм может уже вне диапазона, а вот начаться обязан в диапазоне.    

    }

    const Limit = () => {
        return films.filter(v => Defineder(v.StartDate)).length;
    }

    const SoonView = () => {
        !films ? exit : '';
        const res = [];
        let PinkBlue = '';
        let PinkBlueBtn = '';

        films.filter(v => Defineder(v.StartDate)).forEach((unit, idx) => {
            res.push(
                <div className={styles.Slide} key={idx}
                    onTouchStart={(e) => setX(e.touches[0].clientX)}
                    onTouchEnd={(e) => MoveHandler(e.changedTouches[0].clientX, idx)}
                    onMouseDown={(e) => setX(e.clientX)}
                    onMouseUp={(e) => MoveHandler(e.clientX, idx)}
                >
                    <div className={styles.tsContent}>
                        <img src={unit.ImageSmall || ImageSmall} className={styles.Image} />
                        <div className={styles.Cover} />
                    </div>
                    <div className={styles.TextContent}>
                        <div className={styles.Dates}>{unit.nowDates}</div>
                        <div className={styles.FilmTitle}>{unit.FilmName}</div>
                        <div className={styles.FilmTitle}>{unit.AltFilmName}</div>
                    </div>

                </div>

            )
        })

        return res;
    }



    return (
        <>
            <div className={styles.Container} >
                <div className={styles.Top}>
                    <a href="/#/today"><span className={styles.Tabs}>Скоро в кино</span></a>
                </div>
                <div className={styles.Slider} onLoad={(e) => AutoMoveHandler(e)} style={{ width: Visual * canvasWidth, marginLeft: shift }}>
                    {(() => SoonView())()}
                </div>
                <div style={{ clear: 'left' }} />
            </div>
        </>
    )

}
const mapStateToProps = (state) => ({
    Films: state
});

const Soon = compose(
    connect(mapStateToProps, { InitFilmsAction })
)(_Soon)

export { Soon }