import React, {Component} from 'react';
import axios from 'axios';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Credit extends Component {

    constructor() {
      super();
  
      this.state = {
        description: null,
        amount: null,
        date: null,
        arrObj: [],
        accountBalance: 0,
      }
    }
componentDidMount(){
    this.handleGetCredit();
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    const today = [year, month, day].join('-');
    this.setState({todayDate: today});
    this.props.newCre(-500)
}

handleGetCredit = () => {

    axios.get(`https://moj-api.herokuapp.com/Credits`)
    .then ((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ arrObj: data})
    })
    .catch((err) => console.log(err));
  }

  handleSubmitCredit = (event) => {
    event.preventDefault();
    console.log(this.state.newCredit)
    this.state.arrObj.map( (data) => { 
      this.props.newCre(this.state.newCredit);
      // if(data.description !== this.state.input) {
        let newObj = Object.assign({}, data); 
        newObj.date = this.state.todayDate;
        newObj.description = this.state.description; 
        newObj.amount = this.state.newCredit;
        this.setState({
          arrObj: [newObj, ...this.state.arrObj],
          description: "",
        });
        this.props.newCre(newObj.amount);
      // }
    });
    this.props.newCre(this.state.newCredit);
  }

  handleChange = (event) => {
    this.setState({ description: event.target.value});
  }

  handleAmount = (event) => {
    this.setState({ newCredit: event.target.value});
  }
      render() {

        const show = this.state.arrObj.map((data) => { 
            return <div>
                Description: {data.description}
                <br></br>
                Amount: {data.amount}
                <br></br>
                Date: {data.date}
                <p></p>
        </div>}
        )

           return (
              <div>
                <Link to="/">Home</Link>
                <br></br>
                <h1>Credit Display</h1>
                <form onSubmit={this.handleSubmitCredit}>
                     <AccountBalance accountBalance={this.props.accountBalance}/>
                    <p></p>
                    <input type="text" name="newDescription" placeholder = "Enter Description Here " onChange = {this.handleChange} />
                     <br></br>
                     <input type="text" name="newCredit" placeholder = "Enter Amount Here " onChange = {this.handleAmount} />
                    <br></br>
                    <button onClick={this.handleSubmitDebit} onChange ={this.handleAmount}>Submit Credit</button>
                    <p></p>
                </form>
                <div>
                    {show}
                </div>
              </div>
          )

      }
}

export default Credit;