import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import {IMangaTitle} from "../App";

interface IState {

}

interface IProps {
    parseResult: IMangaTitle;
}

class TitleChart extends Component<IProps, IState> {
    options = {
        responsive: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
    }

    adaptParseResultToChart() {
        const {parseResult} = this.props;
        parseResult.timingsParsed = parseResult.timingsParsed.splice(-10);

        return {
            labels: parseResult.timingsParsed.map((t, i) => i),
            datasets: [
                {
                    label: "rating",
                    data: parseResult.timingsParsed.map(t => t.rating),
                    backgroundColor: "rgb(163, 55, 215)",
                    borderColor: "rgba(163, 55, 215, 0.2)",
                },
                {
                    label: "views",
                    data: parseResult.timingsParsed.map(t => t.views),
                    backgroundColor: "rgb(215, 55, 80)",
                    borderColor: "rgba(215, 55, 80, 0.2)",
                },
                {
                    label: "votes",
                    data: parseResult.timingsParsed.map(t => t.votes),
                    backgroundColor: "rgb(60, 215, 55)",
                    borderColor: "rgba(60, 215, 55, 0.2)",
                },
            ]
        }
    }

    render() {
        return (
            <div className="chart">
                <h2 className="chart__title">{this.props.parseResult.title}</h2>
                <Line data={this.adaptParseResultToChart()} type={"line"} options={this.options}/>
            </div>
        );
    }
}

export default TitleChart;