import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import './contact.css';

class Contact extends Component {
	state = {
		showContactInfo: false
	};

	/* Refactor .then older promise syntax into newer async syntax */
	// onDeleteClick = (id, dispatch) => { 
	// 	axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
	// 		.then(res => 
	// 			dispatch({type: 'DELETE_CONTACT', payload: id})
	// 		);		
	// }
	
	// onDeleteClick = async (id, dispatch) => {    
	// 	await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
	// 	dispatch({ type: 'DELETE_CONTACT', payload: id });    
	// };
	
	onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
	};

	render() {
		const { id, name, email, phone } = this.props.contact;		
		const {showContactInfo} = this.state;

		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-3">
							<h4>
								{name}{' '} 
								<i className="fas fa-sort-down" 	
									style={{cursor: 'pointer'}}					
									onClick={() => 
										this.setState({ showContactInfo: !this.state.showContactInfo })
									}										
								/>
								<i className="fas fa-times" 
									style={{cursor: 'pointer', float:'right', color:'red'}} 
									onClick={this.onDeleteClick.bind(this, id, dispatch)}>						
								</i>
								<Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
							</h4>
							{					
								showContactInfo ? (
									<ul className="list-group">
										<li className="list-group-item">Email: {email}</li>
										<li className="list-group-item">Phone: {phone}</li>
									</ul>
								) : null					
							}					
						</div>
					);
				}}
			</Consumer>			
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired	
}

export default Contact;