import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, addItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  deleItemFromList = id => {
    this.setState({ items: this.props.deleteItem(id) });
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <Button
          color='dark'
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const newName = prompt("Enter Item Name");
            if (newName) {
              this.setState({ items: this.props.addItems(newName) });
            }
          }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={this.deleItemFromList.bind(this, id)}
                  >
                    &times;
                  </Button>
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

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  addItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, addItems, deleteItem }
)(ShoppingList);