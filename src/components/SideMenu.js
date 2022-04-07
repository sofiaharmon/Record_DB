import React, { useContext, useState } from 'react'
import {
    Container,
    Header,
    Segment,
    Dropdown,
    Menu
} from 'semantic-ui-react'
import MainSearch from '../components/MainSearch';
import SearchResCell from '../components/SearchResCell';

// props is the img, title, quantity, artist, release date
function SideMenu() {
    const menu = (
        <Menu secondary vertical>
        <Menu.Item
          name='Search'
        />
        <Menu.Item
          name='Records'
        />
        <Dropdown item text='Options'>
          <Dropdown.Menu>
            <Dropdown.Header>Text Size</Dropdown.Header>
            <Dropdown.Item>Small</Dropdown.Item>
            <Dropdown.Item>Medium</Dropdown.Item>
            <Dropdown.Item>Large</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    )
    return menu;
}

export default SideMenu;