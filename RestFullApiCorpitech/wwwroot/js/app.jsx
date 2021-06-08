class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            show: false,
        };
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
            'div',
            { onClick: this.onClick,className: 'commentBox' },
            'Hello, world! I am a CommentBox.',
        );
    }
}

ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content'),
);