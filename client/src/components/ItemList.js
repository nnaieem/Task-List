import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { connect } from 'react-redux';
import { getItems, editItem, deleteItem } from '../actions/item-actions';
import PropTypes from 'prop-types';

class ItemList extends Component {

    state = {
        value: 0
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id); // will go to actions
    }

    onEditClick = (id) => {
        this.props.editItem(id); // will go to actions
    }

    componentDidMount(){
        this.props.getItems(); // will go to actions
    }

    render(){
        console.log('ItemList: this.props.itemsObj:', this.props.itemsObj);
        const { items } = this.props.itemsObj;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shoppig-list">
                    {items.map(({_id, name}) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button className="remove-btn" color="danger" size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                >Delete</Button>
                                <Button className="edit-btn" color="warning" size="sm"
                                        onClick={this.onEditClick.bind(this, _id)}
                                >Modify</Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

ItemList.propTypes = { //when a action is imported from redux it's add to your class as a prop
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    itemsObj: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    itemsObj: state.ItemReducer
});

export default connect(mapStateToProps, { getItems, deleteItem, editItem })(ItemList);