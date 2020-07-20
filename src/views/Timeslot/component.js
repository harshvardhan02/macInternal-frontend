import React, { Component } from 'react';
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';

export default class TimeSlot extends Component {
	constructor(props){
		super(props);

		this.state = {
			time: '',
			week: [],
			currentDate: ''
		}
		this.onClick = this.onClick.bind(this);
		this.getButtonValue = this.getButtonValue.bind(this);
	}

	static getDerivedStateFromProps(props, state){
		console.log(state, 'state');
		console.log(props, 'props')
		if(props.timeSlots !== state.time){
			return {
				time: props.timeSlots[1]
			}
		}
		return null
	}

	// componentWillReceiveProps(nextProps){
	// 	console.log(nextProps)
	// }

	componentDidUpdate(prevProps, prevState){
		console.log(prevProps, 'prevProps');
		console.log(prevState, 'prevState');
		// if(prevProps.timeSlots[0] === 'Monday'){
		// 	this.setState({
		// 		time: prevProps.timeSlots[0]
		// 	})
		// }
	}

	onClick = () => {
		this.setState({
			time: '12:12 AM'
		})
	}

	componentDidMount(){
		// setInterval(() => {
		// 	this.setState({
		// 		time: moment().format('MMMM Do YYYY, h:mm:ss a')
		// 	})
		// }, 1000)
		this.getCurrentWeek();
	}

	getCurrentWeek = () => {
  		var currentDate = moment();

  		var weekStart = currentDate.clone().startOf('isoWeek');
  		var weekEnd = currentDate.clone().endOf('isoWeek');

  		var days = [];

  		for (var i = 0; i <= 6; i++) {
    		days.push(moment(weekStart).add(i, 'days').format("MMMM Do, ddd"));
  		}
  		this.setState({
  			week: days
  		})
	}

	getButtonValue = (e) => {
		console.log(e.target.value)
		this.setState({
			currentDate: e.target.value
		})
	}	

	render() {
		console.log(this.state.week)
		return (			
			<div className="container">
				<h1>{this.state.currentDate}</h1>
				<h1>{moment().format("MMM Do ddd")}</h1>
				<h1>{moment.duration().asMinutes()}</h1>				
				
				{this.state.week.map(week => (
					<button onClick={this.getButtonValue} value={week} className="btn btn-warning mr-3" key={week}>{week}</button>
				))}
				<br/>
				<button onClick={this.onClick} className="btn btn-danger mt-5">Click</button> 
			</div>
		)
	}
}