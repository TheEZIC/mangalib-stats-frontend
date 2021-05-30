import React, {Component} from 'react';
import {default as axios} from "axios"

import {backendURL} from "../config.json";
import TitleChart from "./TitleChart/TitleChart";

import "./App.scss";

export interface ITimingParsed {
    id: number;
    rating: number;
    votes: number;
    views: number;
    date: Date;
}

export interface IMangaTitle {
    id: number;
    title: string;
    altTitle: string;
    timingsParsed: ITimingParsed[];
}

interface IGetTitleResponse {
    status: 200;
    titles: IMangaTitle[];
}

interface IProps {

}

interface IState {
    data?: IMangaTitle[];
}

class App extends Component<IProps, IState> {
    async componentDidMount() {
        const { titles: data } = (await axios.get(`${backendURL}/api/getTitles`)).data as IGetTitleResponse;
        this.setState({data});
    }

    render() {
        return (
            <div className="App">
                {this.state?.data && this.state.data.map((d, i) =>
                    <TitleChart parseResult={d} key={`chart-${i}`}/>
                )}
            </div>
        );
    }
}

export default App;