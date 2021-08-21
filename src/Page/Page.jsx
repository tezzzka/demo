import { compose } from 'redux';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import './Page.css';

import ImageLogo from '../../public/assets/logo.png';
import ImageInstagram from '../../public/assets/instagram.png';
import ImageOK from '../../public/assets/odnoklassniki.png';
import ImageYoutube from '../../public/assets/youtube.png';
import ImageVK from '../../public/assets/vk.png';
import { Footer } from '../footer';
import { Welcome } from '../Welcome';
import { Today } from '../Today';

import { InitFilmsAction } from '../storage/actions';
import { data } from '../../public/data';

const _Page = (props) => {
    useEffect(() => {
        props.InitFilmsAction(data) //or fetching data from backend to redux store after that.
    }, [])
    return (
        <>
            <Welcome />
            <Today />
            {/* <div className="w2"></div>
            <div className="w3"></div> */}
            <Footer />
        </>
    )
}
const mapStateToProps = (state) => ({
    Films: state
});

const Page = compose(
    connect(mapStateToProps, { InitFilmsAction })
)(_Page)

export { Page }