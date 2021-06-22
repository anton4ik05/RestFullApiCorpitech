function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}
function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { token: getToken(), login: "", password: "" };
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    onLoginChange(e) {
        this.setState({ login: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    render() {
        console.log(this.state.token);
        return !this.state.token ?
            React.createElement('div', null,
                React.createElement('form', { onSubmit: this.onSubmit },
                    React.createElement('div', {},
                        React.createElement('span', {},'Логин'),
                        React.createElement('input', { placeholder: 'Логин', type: 'text', autoComplete: "off", onChange: this.onLoginChange, value: this.state.login }),
                    ),
                    React.createElement('div', {},
                        React.createElement('span', {}, 'Пароль'),
                        React.createElement('input', { placeholder: 'Пароль', type: 'password', autoComplete: "off", onChange: this.onPasswordChange, value: this.state.password })),
                    React.createElement('button', {type:'submit'},'Вход'),
                ))
            : React.createElement('div', null, "asd");
    }
}

ReactDOM.render(
    React.createElement(Login, null),
    document.getElementById('loginApp'),
);