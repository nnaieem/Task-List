import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateItem } from '../actions/item-actions';
import PropTypes from 'prop-types';

class ItemModalEdit extends Component{
    state = {
        modal: false,
        _id: '',
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            _id: '',
            name: ''
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const changedItem = { _id: this.state._id, name: this.getName.props.value || ' ' }

        // Edit item
        this.props.updateItem(changedItem);

        // Close modal
        this.toggle();
    }

    //When reducer is changed, it going to be called
    componentWillReceiveProps(nextProps){
        console.log('ItemModelEdit: componentWillReceiveProps: Old Props State: ', this.props, this.props.itemObj.item);
        console.log('ItemModelEdit: componentWillReceiveProps: nextProps: ', nextProps);
        console.log(arguments);

        const editItem = nextProps.itemObj.item; 
        console.log(JSON.stringify(editItem));
        if(editItem){
            this.toggle();
            this.setState({ _id: editItem._id, name: editItem.name });
        }
    }
    
    render(){
        return(
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Your Task</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item ID</Label>
                                <Input type="text" name="_id" id="item" placeholder="Item ID" readOnly defaultValue={this.state._id} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="item">Task Description</Label>
                                <Input type="text" name="name" id="item" placeholder="Edit shopping item" 
                                       onChange={this.onChange} ref={(input) => this.getName = input} value={this.state.name}/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="dark"style={{ marginBottom: '2rem' }} block>Edit Task</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

ItemModalEdit.propTypes = { //When a action is imported from redux it's added to your class as a prop
    updateItem: PropTypes.func.isRequired,
    itemObj: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    itemObj: state.ItemReducer
});
export default connect(mapStateToProps, { updateItem })(ItemModalEdit);