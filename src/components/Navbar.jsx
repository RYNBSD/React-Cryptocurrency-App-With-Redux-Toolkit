import React, { useState, useEffect } from 'react'

import { Button, Menu, Typography, Avatar } from 'antd'

import { Link } from 'react-router-dom'

import icon from '../images/cryptocurrency.png'

import { 
    HomeOutlined, 
    MoneyCollectOutlined, 
    BuildOutlined, 
    FundOutlined, 
    MenuFoldOutlined 
} from '@ant-design/icons'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false)
            return
        }
        setActiveMenu(true)
    }, [screenSize])

  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size='large' />
            <Typography.Title level={2} className='logo'>
                <Link to='/'>CryptoZ</Link>
            </Typography.Title>
            <Button 
                className='menu-control-container' 
                onClick={() => setActiveMenu(!activeMenu)}
            >
                <MenuFoldOutlined />
            </Button>
        </div>
        {
            activeMenu && (
                <Menu>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BuildOutlined />}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                </Menu>            
            )
        }

        
    </div>
  )
}

export default Navbar