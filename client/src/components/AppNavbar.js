import React, { Component } from 'react';
import {
    Collapse, Navbar, NavbarToggler, 
    NavbarBrand, Nav, NavItem, NavLink, Container 
} from 'reactstrap';

class AppNavbar extends Component {
    state = { isOpen: false }
    constructor(props) {
        super(props);
        this.toggleHavToBeenBined = this.toggleHavToBeenBined.bind(this);
    }

    toggleHavToBeenBined() {
        console.log('Binded function because Im using arrow function');
     }
     
     toggle = () => {
        this.setState({
           isOpen: !this.state.isOpen 
        });
     }

     render(){
         return (
           <div>
             <Navbar color="dark" dark expand="sm" className="mb-5">
               <Container>
                 <NavbarBrand href="/">Todoz</NavbarBrand>
                 <NavbarToggler onClick={this.toggle} />
                 <Collapse isOpen={this.state.isOpen} navbar>
                   <Nav className="ml-auto" navbar>
                     <NavItem>
                       <NavLink href="https://calendar.google.com/calendar/r?pli=1">
                         Calendar
                       </NavLink>
                     </NavItem>
                   </Nav>
                 </Collapse>
               </Container>
             </Navbar>
           </div>
         );
     }
}



export default AppNavbar;