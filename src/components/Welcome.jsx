import tableStyles from "../styles/tableStyles.js";

function WelcomeMessage () {

    return (
        <div style={tableStyles.container}>
            <h1>Welcome on EventFlow !</h1>
            <p>Select an option in the menu to start. </p>
        </div>
    );
}

export default WelcomeMessage;