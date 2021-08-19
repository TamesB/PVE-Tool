import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { getItems, deleteItem } from '../../actions/pveitems';
import { getHoofdstukken } from '../../actions/hoofdstukken';
import { getParagraven } from '../../actions/paragraven';
import { Header, Table, Button, Icon, Segment, Dimmer, Loader, Image, Confirm, Accordion, Select, Form } from 'semantic-ui-react'

export class Items extends Component {
    static propTypes = {
        hoofdstukken: PropTypes.array.isRequired,
        getHoofdstukken: PropTypes.func.isRequired,
        hoofdstukkenIsLoading: PropTypes.bool,

        paragraven: PropTypes.array.isRequired,
        getParagraven: PropTypes.func.isRequired,
        paragravenIsLoading: PropTypes.bool,

        items: PropTypes.array.isRequired,
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        itemsIsLoading: PropTypes.bool
    };

    state = {
        openConfirmDelete: false,
        confirmDeleteItem: 0,
        versie: 1,
        hoofdstuk: "",
        paragraaf: "",
    }

    showDeleteModal = (item_id) => this.setState({ openConfirmDelete: true, confirmDeleteItem: item_id })
    handleDeleteCancel = () => this.setState({ openConfirmDelete: false, confirmDeleteItem: 0 })

    handleDeleteConfirm = () => {
        this.props.deleteItem(this.state.confirmDeleteItem)
        this.setState({ openConfirmDelete: false, confirmDeleteItem: 0 })
    }

    handleHfstChange = (e, { value }) => {
        this.setState({ hoofdstuk: value, paragraaf: "" }, () => {
                this.props.getParagraven(this.state.versie, this.state.hoofdstuk);
                this.props.getItems(this.state.versie, this.state.hoofdstuk, this.state.paragraaf);
            }
        )
    }

    handlePrgrfChange = (e, { value }) => {
        this.setState({ paragraaf: value },
            () => this.props.getItems(this.state.versie, this.state.hoofdstuk, this.state.paragraaf)
        )
    }
    componentDidMount() {
        this.props.getHoofdstukken(this.state.versie);
        this.props.getParagraven(this.state.versie, this.state.hoofdstuk);
        this.props.getItems(this.state.versie, this.state.hoofdstuk, this.state.paragraaf);
    };
      
    render() {
        const { openConfirmDelete, confirmDeleteItem, hoofdstuk, paragraaf } = this.state

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
                        <Table.HeaderCell>Inhoud</Table.HeaderCell>
                        <Table.HeaderCell>Bijlage</Table.HeaderCell>
                        <Table.HeaderCell>Acties</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {this.props.items.map(item => (
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.versie}</Table.Cell>
                        <Table.Cell>{item.inhoud}</Table.Cell>
                        <Table.Cell>
                            {item.bijlage ?                                     
                                <Button as="a" href={item.bijlage} target="_blank">
                                    <Icon name='download' />
                                </Button> : ""
                            }
                        </Table.Cell>
                        <Table.Cell>                                
                            <Button onClick={() => this.showDeleteModal(item.id)} color="red" icon>
                                    <Icon name="trash alternate" />
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>

                <Confirm
                    content="Weet je het zeker?"
                    confirmButton="Verwijder"
                    cancelButton="Behoud"
                    open={openConfirmDelete}
                    onCancel={this.handleDeleteCancel}
                    onConfirm={this.handleDeleteConfirm}
                />
            </Fragment>
        );
        return (

            <Fragment>
                <Header as='h2'>PVE Items</Header>
                <Form>
                <Form.Group widths='equal'>
                <Form.Input
                    control={Select}
                    type="text"
                    name="hoofdstuk"
                    placeholder='Kies hoofdstuk...'
                    label="Hoofdstuk"
                    onChange={this.handleHfstChange}
                    options={this.props.hoofdstukken.map(hoofdstuk => ({key: hoofdstuk.id, text: hoofdstuk.hoofdstuk, value: hoofdstuk.id}))}
                    value={hoofdstuk}
                />  
                <Form.Input
                    control={Select}
                    type="text"
                    name="paragraaf"
                    label="Paragraaf"
                    placeholder='Kies paragraaf...'
                    onChange={this.handlePrgrfChange}
                    options={this.props.paragraven.map(paragraaf => ({key: paragraaf.id, text: paragraaf.paragraaf, value: paragraaf.id}))}
                    value={paragraaf}
                /> 
                </Form.Group>
                </Form>
                <Table striped>
                    { this.props.itemsIsLoading ? loadingTable : renderedTable}
                </Table>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    items: state.pveitems.items,
    itemsIsLoading: state.pveitems.itemsIsLoading,
    hoofdstukken: state.hoofdstukken.hoofdstukken,
    hoofdstukkenIsLoading: state.hoofdstukken.hoofdstukkenIsLoading,
    paragraven: state.paragraven.paragraven,
    paragravenIsLoading: state.paragraven.paragravenIsLoading,
});

export default connect(mapStateToProps, { getHoofdstukken, getParagraven, getItems, deleteItem })
(Items);
