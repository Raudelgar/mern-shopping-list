import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItems } from '../actions/itemActions';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class ItemModal extends Component {
	state = {
		modal: false,
		name: ''
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	saveItem = e => {
		e.preventDefault();
		const newItem = {
			name: this.state.name
		};

		//Add item via addItems action
		this.props.addItems(newItem);

		//Automaticaly close modal
		this.toggle();
	};

	render() {
		return (
			<div>
				<Button
					color='dark'
					style={{ marginBottom: '2rem' }}
					onClick={this.toggle}
				>
					Add Item
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for='item'>Item</Label>
								<Input
									type='text'
									name='name'
									id='item'
									placeholder='Add shopping item'
									onChange={this.onChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label for='exampleSelect'>Select Quantity</Label>
								<Input type='select' name='select' id='exampleSelect'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Input>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color='dark' block onClick={this.saveItem}>
							Save
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

ItemModal.propTypes = {
	addItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ addItems }
)(ItemModal);
