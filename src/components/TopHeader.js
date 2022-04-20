import React, { Component } from 'react'
import { Container, Grid, Header, Input, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class TopHeader extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className='background-header'>
        <Container>
          <br />
          <h1 className='masthead'>Hear Again Records - Admin Page</h1>
          <Menu secondary>
            <Menu.Item
              className='color-offwhite'
              name='home'
              active={activeItem === 'home'}
              as={Link}
              to="/"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              className='color-offwhite'
              name='register'
              as={Link}
              to="/register"
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              className='color-offwhite'
              name='distributors'
              as={Link}
              to="/distributors"
              active={activeItem === 'distributors'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              className='color-offwhite'
              name='add record'
              as={Link}
              to="/addrecord"
              active={activeItem === 'add record'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Menu.Item
                className='color-offwhite'
                name='logout'
                as={Link}
                to="/login"
                active={activeItem === 'logout'}
                onClick={() => {
                  localStorage.removeItem("token")
                  console.log(localStorage.getItem("token"))
                }}
              />
            </Menu.Menu>
          </Menu>
        </Container>
      </div>
    )
  }
}