
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.user };
        this.onClick = this.onClick.bind(this);
    }


    onClick() {
        fetch("./user")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)
                }
            )
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
        fetch("../user")
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
                return React.createElement(User, { key: user.id, user: user })
            })
        );
    }
}


ReactDOM.render(
    React.createElement(UserList, null),
    document.getElementById('content'),
);