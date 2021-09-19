import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Week } from '../Week';
const _Sessions = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={() => <Week period="week" />} />
                <Route exact path="/today" component={() => <Week period="today" />} />
            </Switch>
        </>
    )
}
const Sessions = withRouter(_Sessions);
export { Sessions }
