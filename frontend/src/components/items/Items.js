import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { getItems, deleteItem } from '../../actions/pveitems';
import { Header, Table, Button, Icon, Segment, Dimmer, Loader, Image } from 'semantic-ui-react'
import { PVEITEMS_LOADING } from '../../actions/types';

export class Items extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        itemsIsLoading: PropTypes.bool
    };

    componentDidMount() {
        this.props.getItems();
    };

    render() {
        const loadingTable = (
            <Fragment>
                <Table.Body>
                <Table.Row>
                    <Segment>
                <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>

                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>
                </Table.Row>
                </Table.Body>
            </Fragment>
        );
        const renderedTable = (
            <Fragment>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Versie</Table.HeaderCell>
                        <Table.HeaderCell>Hoofdstuk</Table.HeaderCell>
                        <Table.HeaderCell>Paragraaf</Table.HeaderCell>
                        <Table.HeaderCell>Inhoud</Table.HeaderCell>
                        <Table.HeaderCell>Bijlage</Table.HeaderCell>
                        <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {this.props.items.map(item => (
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.versie}</Table.Cell>
                        <Table.Cell>{item.hoofdstuk}</Table.Cell>
                        <Table.Cell>{item.paragraaf}</Table.Cell>
                        <Table.Cell>{item.inhoud}</Table.Cell>
                        <Table.Cell>
                            {item.bijlage ?                                     
                                <Button as="a" href={item.bijlage} target="_blank">
                                    <Icon name='download' />
                                </Button> : ""
                            }
                        </Table.Cell>
                        <Table.Cell>                                
                            <Button onClick={this.props.deleteItem.bind(this, item.id)} color="red" icon>
                                    <Icon name="trash alternate" />
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Fragment>
        );
        return (

            <Fragment>
                <Header as='h2'>PVE Items</Header>
                <Table striped>
                    { this.props.itemsIsLoading ? loadingTable : renderedTable}
                </Table>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    items: state.pveitems.items,
    itemsIsLoading: state.pveitems.itemsIsLoading
});

export default connect(mapStateToProps, { getItems, deleteItem })
(Items);
