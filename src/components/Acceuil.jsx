import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    FaHome,
    FaSignOutAlt,
    FaCalendarAlt,
    FaTag,
    FaUserAlt,
    FaMapMarkerAlt,
    FaBell,
    FaCommentAlt,
    FaPeopleCarry,
    FaUserCircle
} from 'react-icons/fa';
import acceuilStyles from "../styles/acceuilStyle.js";

const { Header, Content, Footer, Sider } = Layout;

const headerItems = [
    { key: '1', label: 'Event', route: 'event', icon: <FaCalendarAlt size={18} /> },
    { key: '2', label: 'Category', route: 'category', icon: <FaTag size={18} /> },
    { key: '3', label: 'User', route: 'user', icon: <FaUserAlt size={18} /> },
    { key: '4', label: 'Location', route: 'location', icon: <FaMapMarkerAlt size={18} /> },
    { key: '5', label: 'linkUserEvent', route: 'linkUserEvent', icon: <FaPeopleCarry size={18} /> },
    { key: '6', label: 'Notification', route: 'notification', icon: <FaBell size={18} /> },
    { key: '7', label: 'Message', route: 'message', icon: <FaCommentAlt size={18} /> },
    { key: '8', label: 'DiscussionEvent', route: 'discussionEvent', icon: <FaCommentAlt size={18} /> }
];

const sliderItems = [
    { key: '1', label: 'Home', icon: <FaHome size={18} />},
    { key: '2', label: 'Log-out', icon: <FaSignOutAlt size={18} />, onClick: handleLogout },
];

function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
}

function Acceuil() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('token') === null) {
            navigate('/login');
        } else {
            setUsername(localStorage.getItem('username'));
        }
    }, [navigate]);

    const currentRoute = location.pathname.split('/').pop();

    return (
        <Layout>
            <Sider breakpoint="lg" collapsedWidth="0">
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={sliderItems} />
            </Sider>
            <Layout>
                <Header style={acceuilStyles.header}>
                    <div style={acceuilStyles.titleContainer}>EventFlow</div>
                    <div style={acceuilStyles.sloganContainer}>Where event come to life</div>
                    <div style={acceuilStyles.headerRight}>
                        {username && (
                            <div style={acceuilStyles.welcomeMessage}>
                                <FaUserCircle size={35} style={acceuilStyles.icon} />
                                <span style={acceuilStyles.username}>Welcome, {username}</span>
                            </div>
                        )}
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[headerItems.find(item => item.route === currentRoute)?.key || '1']}
                        items={headerItems.map(item => ({
                            ...item,
                            label: <Link to={item.route}>{item.label}</Link>
                        }))}
                        style={acceuilStyles.menuContainer}
                    />
                </Header>
                <Content style={acceuilStyles.content}>
                    <Outlet />
                </Content>
                <Footer style={acceuilStyles.footer}>©2024 EventFlow</Footer>
            </Layout>
        </Layout>
    );
}

export default Acceuil;
