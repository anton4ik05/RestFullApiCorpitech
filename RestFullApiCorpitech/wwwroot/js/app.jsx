
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.user };
    }

    render() {
        return React.createElement(
            'div', null,
            React.createElement('p', {}, "Имя: ",this.state.data.name),
            React.createElement('p', {}, "Фамилия: ",this.state.data.surname),
        );
    }
}



class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
    }
    // загрузка данных
    loadData() {
        fetch("../users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({ users: result });
                },
                (error) => {
                    console.log(error)
                }
            )

    }
    componentDidMount() {
        this.loadData();
    }

    render() {

        return React.createElement(
            'div', null, 'Работники', 
            this.state.users.map(function (user) {
                return React.createElement(User, { key: Math.random(), user: user })
            })
        );
    }
}


ReactDOM.render(
    React.createElement(UserList, null),
    document.getElementById('content'),
);