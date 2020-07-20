import { connect } from 'react-redux';
import TimeSlot from './component';

const TimeSlotContainer =  connect(
	// map state to props
	state => ({
		timeSlots: state.user.timeSlots
	}),
	// map dispatch to props
	{

	}
	)(TimeSlot)

export default TimeSlotContainer;	
