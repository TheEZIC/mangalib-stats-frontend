import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import {IMangaTitle, ITimingParsed} from "../App";

import "./TitleChart.scss";

interface IState {
    croppedTimingParsed: ITimingParsed[];
}

interface IProps {
    parseResult: IMangaTitle;
}

class TitleChart extends Component<IProps, IState> {
    state: IState = {
        croppedTimingParsed: []
    }

    options = {
        responsive: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
    }

    componentDidMount() {
        const croppedTimingParsed = this.props.parseResult.timingsParsed.splice(-10);
        this.setState({croppedTimingParsed});
    }

    adaptRatingChartData() {
        const {croppedTimingParsed} = this.state;

        return {
            labels: croppedTimingParsed?.map((t, i) => i),
            datasets: [{
                label: "rating",
                data: croppedTimingParsed?.map(t => t.rating),
                backgroundColor: "rgb(163, 55, 215)",
                borderColor: "rgba(163, 55, 215, 0.2)",
            }]
        }
    }

    adaptViewsChartData() {
        const {croppedTimingParsed} = this.state;

        return {
            labels: croppedTimingParsed?.map((t, i) => i),
            datasets: [{
                label: "views",
                data: croppedTimingParsed?.map(t => t.views),
                backgroundColor: "rgb(60, 215, 55)",
                borderColor: "rgba(60, 215, 55, 0.2)",
            }]
        }
    }

    adaptVotesChartData() {
        const {croppedTimingParsed} = this.state;

        return {
            labels: croppedTimingParsed?.map((t, i) => i),
            datasets: [{
                label: "votes",
                data: croppedTimingParsed?.map(t => t.votes),
                backgroundColor: "rgb(220, 190, 35)",
                borderColor: "rgba(220, 190, 35, 0.2)",
            }]
        }
    }

    render() {
        return (
            <div className="chart">
                <h2 className="chart__title">{this.props.parseResult.title}</h2>
                <div className="chart__container">
                    <Line data={this.adaptRatingChartData()} type={"line"} options={this.options}/>
                    <Line data={this.adaptViewsChartData()} type={"line"} options={this.options}/>
                    <Line data={this.adaptVotesChartData()} type={"line"} options={this.options}/>
                </div>
            </div>
        );
    }
}

export default TitleChart;