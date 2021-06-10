
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
            React.createElement('td', {}, Math.round(this.state.data.days)),
            React.createElement('td', {}, this.state.data.value.toFixed(2)),
            React.createElement('td', {}, formatDate(new Date(this.state.data.dateOfEndVacation))),
        );
    }
}

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", surname: "", middlename: "", };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onMiddlenameChange = this.onMiddlenameChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onSurnameChange(e) {
        this.setState({ surname: e.target.value });
    }
    onMiddlenameChange(e) {
        this.setState({ middlename: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Asd");
        var name = this.state.name.trim();
        var surname = this.state.name.trim();
        var middlename = this.state.name.trim();

        console.log(name + " " + surname + " " + middlename);
        if (!phoneName || phonePrice <= 0) {
            return;
        }
        this.props.onUserSubmit({ name: name, surname: surname, middlename: middlename });
        this.setState({ name: "", surname: "", middlename: "" });
    }

    render() {
        return React.createElement('form', { onSubmit: this.onSubmit },
            React.createElement('input', { placeholder: 'Name', type: 'text', onChange: this.onNameChange, value: this.state.name }),
            React.createElement('input', { placeholder: 'Surname', type: 'text', onChange: this.onSurnameChange, value: this.state.surname }),
            React.createElement('input', { placeholder: 'Middlename', type: 'text', onChange: this.onMiddlenameChange, value: this.state.middlename }),
            React.createElement('button', { type: 'submit', className: 'postfix' }, 'Submit')

        )
    }
}


class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
    }
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
    React.createElement(UserForm, null),
    document.getElementById('content'),
);