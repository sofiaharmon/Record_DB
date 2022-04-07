import React, { Component } from 'react'
import { Container, Grid, Header, Input, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class TopHeader extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Container>
        <br/>
        <h1 className='masthead'>Hear Again Records - Admin Page</h1>
        <Menu secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            as={Link}
            to="/"
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='register'
            as={Link}
            to="/register"
            active={activeItem === 'register'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='login'
            as={Link}
            to="/"
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}