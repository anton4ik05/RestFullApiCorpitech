
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.user };
    }

    render() {
        return React.createElement(
            'tr', null,    
            React.createElement('td', {}, this.state.data.surname + " " + this.state.data.name + " "+this.state.data.middlename),
            React.createElement('td', {}, this.state.data.dateOfEmployment),
            React.createElement('td', {}, 25),
            React.createElement('td', {}, 123),
            React.createElement('td', {}, this.state.data.dateOfEndVacation),
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
            'table', { className: 'usersTable' }, React.createElement('caption', {},'Работники'),
            React.createElement('tr', {className: 'users'},
                React.createElement('th', {}, "ФИО"),
                React.createElement('th', {}, "Дата трудоустройства"),
                React.createElement('th', {}, "Дней Отпуска"),
                React.createElement('th', {}, "СУММА при увольнении"),
                React.createElement('th', {}, "На дату")),
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