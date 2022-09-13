import React from 'react'

import { Line } from 'react-chartjs-2'

import { CategoryScale } from "chart.js";
import Chart from 'chart.js/auto';

import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

Chart.register(CategoryScale);
const LineChart = ({ coinHistory, currentPrice, coinName }) => {

    //console.log(coinHistory);

    const coinPrice = [];
    const cionTimeStamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory?.data?.history[i].price)
        cionTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString())
        //console.log(coinHistory?.data?.history[i].timestamp, cionTimeStamp[cionTimeStamp.length-1]);
    }
    //console.log(cionTimeStamp);

    const data = {
        labels: cionTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    return (
        <>
            <Row className='chart-header'>
                <Title className='chart-title' level={2}>
                    {coinName} Price Chart
                </Title>
                <Col className='price-container'>
                    <Title className='price-change' level={5}>
                        {coinHistory?.data?.change}%
                    </Title>
                    <Title className='current-price' level={5}>
                        Current {coinName} Price: ${currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data}/>
        </>
    )
}

export default LineChart