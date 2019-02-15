import React, {Component} from 'react';
import * as PubSub from 'pubsub-js';
const axios = require('axios');

export default class ShowUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }


    handleClick() {
        PubSub.publish('showusers')
        this.setState(state => ({
            count: state.count + 1,
        }));
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.handleClick}>
                    Click me
                </button>
                <UsersList/>
            </div>
        );
    }
}

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
        // this.renderEntries = this.renderEntries().bind(this);
        this.subscriptions = [
            PubSub.subscribe('showusers', () => this.loadUsers())
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(PubSub.unsubscribe)
    }

    loadUsers() {
        axios.get("api/get-users").then(response => {
                let tmpList = [];
                response.data.users.forEach(user => {
                    tmpList.push(user)
                    console.log(user)
                });
                this.setState({users: tmpList})
            }
        )
    }

    render() {
        const usersTag =  this.state.users.map((u) => <UserEntry user={u}/>)
        return (
            <div>
                {usersTag}
            </div>
        )
    }
}

function UserEntry(props) {
    return (
        <div>
            {props.user.fname}
            {props.user.lname}
        </div>
    )
}