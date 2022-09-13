import React, { useState} from 'react'

import { Select, Row, Col, Avatar, Card, Typography } from 'antd'

import moment from 'moment'

import { 
  useGetCryptoNewsCategoryQuery, 
  useGetCryptoNewsSearchQuery,
  useGetCryptoNewsTrendingQuery 
} from '../services/cryptoNewsAPI'

import { useGetCryptosQuery } from '../services/cryptoAPI'

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';


function News ({ simplified }) {

  const [newCategory, setNewsCategory] = useState('Cryptocurrency')

  /*
  const { data: Category, isFetching: forCategory } = useGetCryptoNewsCategoryQuery();
  const { data: Trending, isFetching: forTrending } = useGetCryptoNewsTrendingQuery();
  */
  const { data: Search, isFetching: forSearch } = useGetCryptoNewsSearchQuery(newCategory);
  const { data, isFetching } = useGetCryptosQuery();

  //console.log(Trending, Search, Category);

  if (forSearch) return 'Loading...'

  return (

    <Row gutter={[24, 24]}>
      {
        !simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
              {
                data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)
              }
            </Select>
          </Col>
        )
      }
      {
        Search?.value?.map((val, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className='news-card'>
              {/*ref='noreferrer'*/}
              <a href={val?.url} target='_blank'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{val.name}</Title>
                  <img 
                    src={val?.image?.thumbnail?.contentUrl || demoImage} 
                    alt='news'
                    loading='lazy'
                    style={{maxWidth: '200px', maxHeight: '100px'}}
                  />
                </div>
                <p>
                  {val?.description > 0 ? `${val?.description?.substring(0, 100)}...` : val?.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar src={val?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news'/>
                    <Text className='provider-name'>{val?.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(val?.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))
      }
    </Row>  
  )    
};

export default News