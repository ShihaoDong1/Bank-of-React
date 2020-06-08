import React, {Component} from 'react';
import axios from 'axios';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Debit extends Component {

    constructor() {
      super();
  
      this.state = {
        description: null,
        amount: null,
        date: null,
        arrObj: [],
        accountBalance: 0,
        newDebit: 0,
      }
    }
componentDidMount(){
    this.handleGetDebit();

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
    this.props.newDeb(320.34)  
}

handleGetDebit = () => {
    axios.get(`https://moj-api.herokuapp.com/debits`)
    .then ((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ arrObj: data})
    })
    .catch((err) => console.log(err));
  }


handleChange = (event) => { 
    this.setState({description: event.target.value});
}

handleAmount = (event) => {
    this.setState({newDebit: event.target.value});
}

handleSubmitDebit = (event) => {
    event.preventDefault();
    this.props.newDeb(this.state.newDebit);
    console.log(this.state.newDebit);
    this.state.arrObj.forEach( (data) => { 
     
      if(data.description !== this.state.description) {
        let newObj = Object.assign({}, data); 
        newObj.date = this.state.todayDate;
        newObj.description = this.state.description; 
        this.props.newDeb(newObj.amount);
        this.setState({
          arrObj: [newObj, ...this.state.arrObj],
          input: "",
        });
        newObj.amount = this.state.newDebit;
      }
    });
  }

      render() {

        const show = this.state.arrObj.map((data) => { 
            return <div>
                Description: {data.description}
                <br></br>
                Amount: {data.amount}
                <br></br>
                Date: {data.date.substring(0, 10)}
                <p></p>        
        </div>}
        )

          return (
              <div>
                <Link to="/">Home</Link>
                <br></br>
                <h1>Debit Display</h1>
                <form onSubmit={this.handleSubmitDebit}>
                     <AccountBalance accountBalance={this.props.accountBalance}/>
                    <p></p>
                    <input type="text" name="newDescription" placeholder = "Enter Description Here " onChange = {this.handleChange} />
                     <br></br>
                     <input type="text" name="newDebit" placeholder = "Enter Amount Here " onChange = {this.handleAmount} />
                    <br></br>
                    <button onClick={this.handleSubmitDebit} onChange ={this.handleAmount}>Submit Debit</button>
                    <p></p>
                </form>
                <div>
                    {show}
                </div>
              </div>
          )
      }
}

export default Debit;