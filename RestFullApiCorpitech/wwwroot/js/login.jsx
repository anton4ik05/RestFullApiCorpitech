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
                React.createElement('form', { className:"login100-form validate-form",onSubmit: this.onSubmit },
                    React.createElement('div', { className: "wrap-input100 validate-input m-b-26",},
                        React.createElement('span', { className: "label-input100",},'Логин'),
                        React.createElement('input', { className: "input100",placeholder: 'Логин', type: 'text', autoComplete: "off", onChange: this.onLoginChange, value: this.state.login }),
                    ),
                    React.createElement('div', { className: "wrap-input100 validate-input m-b-26",},
                        React.createElement('span', { className: "label-input100",}, 'Пароль'),
                        React.createElement('input', { className: "input100",placeholder: 'Пароль', type: 'password', autoComplete: "off", onChange: this.onPasswordChange, value: this.state.password })),
                    React.createElement('button', { className: "login100-form-btn",type:'submit'},'Вход'),
                ))
            : React.createElement('div', null, "asd");
    }
}

ReactDOM.render(
    React.createElement(Login, null),
    document.getElementById('loginApp'),
);