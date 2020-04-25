import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { createItem } from '../actions/item-actions';
import PropTypes from 'prop-types';

class ItemModal extends Component{
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            name: ''
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.getName.props.value || ' '
        }

        // Add item
        this.props.createItem(newItem);

        // Close modal
        this.toggle();
    }

    render(){
        return(
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Task</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Your Task List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Task Description</Label>
                                <Input type="text" name="name" id="item" placeholder="Task" 
                                       onChange={this.onChange} ref={(input) => this.getName = input} value={this.state.name}/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="dark"style={{ marginBottom: '2rem' }} block>Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

ItemModal.propTypes = { //When a action is imported from redux it's added to your class as a prop
    createItem: PropTypes.func.isRequired,
    itemObj: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    itemObj: state.ItemReducer
});
export default connect(mapStateToProps, { createItem })(ItemModal);