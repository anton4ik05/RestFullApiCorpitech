/*function getToken() {
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
    }
    render() {
        console.log(this.state.token);
        return this.state.token ?
            React.createElement('div', null,
                React.createElement('form', { onSubmit: this.onSubmit },
                    React.createElement('input', { placeholder: 'Логин', type: 'text', autoComplete: "off", onChange: this.onLoginChange, value: this.state.login }),
                    React.createElement('input', { placeholder: 'Пароль', type: 'text', autoComplete: "off", onChange: this.onNameChange, value: this.state.password }),
                    React.createElement('button', {type:'submit'},'Вход'),
                ))
            : React.createElement('div', null, "asd");
    }
}

ReactDOM.render(
    React.createElement(Login, null),
    document.getElementById('loginApp'),
);*/