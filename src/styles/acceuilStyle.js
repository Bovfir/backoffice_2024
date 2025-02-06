const acceuilStyles = {
    header: {
        padding: 0,
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '40px',
        fontWeight: 'bold'
    },
    sloganContainer: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '18px',
        fontStyle: 'italic'
    },
    menuContainer: {
        lineHeight: '63px',
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%'
    },
    content: {
        padding: '50px'
    },
    footer: {
        textAlign: 'center'
    },
    headerRight: {
        position: 'absolute',
        top: '35px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
    },
    welcomeMessage: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
    },
    icon: {
        marginRight: '8px',
    },
    username: {
        fontWeight: 'bold',
    }
};

export default acceuilStyles;
