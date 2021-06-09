
function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.user };
    }

    render() {
        return React.createElement(
            'tr', null,    
            React.createElement('td', {}, this.state.data.surname + " " + this.state.data.name + " "+this.state.data.middlename),
            React.createElement('td', {}, formatDate(new Date(this.state.data.dateOfEmployment))),
            React.createElement('td', {}, Math.round(this.state.data.value)),
            React.createElement('td', {}, this.state.data.value.toFixed(2)),
            React.createElement('td', {}, formatDate(new Date(this.state.data.dateOfEndVacation))),
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
            React.createElement('thead', {},
                React.createElement('tr', {},
                React.createElement('th', {}, "ФИО"),
                React.createElement('th', {}, "Дата трудоустройства"),
                React.createElement('th', {}, "Дней Отпуска"),
                React.createElement('th', {}, "СУММА при увольнении"),
                React.createElement('th', {}, "На дату"))),
            React.createElement('tbody', {},
                this.state.users.map(function (user) {
                    return React.createElement(User, { key: Math.random(), user: user })
                })
            )
            
        );
    }
}


ReactDOM.render(
    React.createElement(UserList, null),
    document.getElementById('content'),
);