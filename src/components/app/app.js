import React, { Component } from 'react';
import { Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BooksPage, HousesPage, BooksItem, MainPage } from '../pages';
import gotService from '../../services/gotService';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import './app.css';

export default class App extends Component {
    gotService = new gotService();
    state = {
        isCharVisible: true,
        error: false,
        selectedHouse: 20
    }



    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onCharVisible = () => {
        this.setState((state) => {
            return {
                isCharVisible: !state.isCharVisible
            }
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage></ErrorMessage>;
        }

        const character = this.state.isCharVisible ? <RandomChar></RandomChar> : null;


        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {character}
                                <button
                                    onClick={this.onCharVisible}
                                    className="toggle-btn">Кликни на меня!</button>
                            </Col>
                        </Row>
                        <Switch>
                        <Route path='/main' exact component={MainPage} />
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/houses'  component={HousesPage} />
                        <Route path='/books' exact component={BooksPage} />
                        <Route path='/books/:id' render={ ({ match }) => {
                                const { id } = match.params;
                                return <BooksItem bookId={id}/> }} />
                        <Route render={() => <> <h1 className="app-h1">Error. You are lost. <br></br> <a  href="/main">Return to Main Page</a> </h1> </> }/>
                                </Switch>
                    </Container>
                </div>
            </Router>
        );
    };
};