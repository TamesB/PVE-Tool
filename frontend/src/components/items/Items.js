import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { getItems, deleteItem, addItem } from '../../actions/pveitems';
import { getHoofdstukken } from '../../actions/hoofdstukken';
import { getParagraven } from '../../actions/paragraven';
import { Header, Table, Button, Icon, Segment, Dimmer, Modal, Loader, Image, Confirm, Accordion, Checkbox, Select, Form } from 'semantic-ui-react'

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
        itemsIsLoading: PropTypes.bool,
        addItem: PropTypes.func.isRequired,
    };

    state = {
        openConfirmDelete: false,
        confirmDeleteItem: 0,
        openAddItemForm: false,
        versie: 1,
        hoofdstuk: "",
        paragraaf: "",
        additeminhoud: "",
        bijlage: null,
        basisregel: false,
    }

    showDeleteModal = (item_id) => this.setState({ openConfirmDelete: true, confirmDeleteItem: item_id })
    handleDeleteCancel = () => this.setState({ openConfirmDelete: false, confirmDeleteItem: 0 })

    handleDeleteConfirm = () => {
        this.props.deleteItem(this.state.confirmDeleteItem)
        this.setState({ openConfirmDelete: false, confirmDeleteItem: 0 })
    }

    showAddItemFormModal = (versie, hoofdstuk, paragraaf) => this.setState({ openAddItemForm: true, addItemVersie: versie, addItemHoofdstuk: hoofdstuk, addItemParagraaf: paragraaf })
    addItemCancel = () => this.setState({ openAddItemForm: false })

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

    fileChangeForm = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { versie, hoofdstuk, paragraaf, additeminhoud, basisregel, bijlage } = this.state;
        const item = { versie, hoofdstuk, paragraaf, additeminhoud, basisregel, bijlage };
        this.props.addItem(item)
        this.setState({
            openAddItemForm: false,
            additeminhoud: '',
            basisregel: false,
            bijlage: null,
        })
    };

    componentDidMount() {
        this.props.getHoofdstukken(this.state.versie);
        this.props.getParagraven(this.state.versie, this.state.hoofdstuk);
        this.props.getItems(this.state.versie, this.state.hoofdstuk, this.state.paragraaf);
    };
      
    render() {
        const { openConfirmDelete, confirmDeleteItem, openAddItemForm, addItemVersie, addItemHoofdstuk, addItemParagraaf, hoofdstuk, paragraaf, additeminhoud, basisregel, bijlage } = this.state
        const form_padding = {
            padding: "0 10vw 0 10vw"
        }

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
                <Button onClick={() => this.showAddItemFormModal(this.state.versie, this.state.hoofdstuk, this.state.paragraaf)} color="green" icon>
                Voeg item toe <Icon name="plus" />
                </Button>

                <Confirm
                    content="Weet je het zeker?"
                    confirmButton="Verwijder"
                    cancelButton="Behoud"
                    open={openConfirmDelete}
                    onCancel={this.handleDeleteCancel}
                    onConfirm={this.handleDeleteConfirm}
                />
                <Modal
                as={Form} 
                open={openAddItemForm}
                onClose={this.addItemCancel}
                onOpen={this.handleItemAddConfirm}
                onSubmit={this.onSubmit}
                >
                <Modal.Header>Voeg item toe</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                            <Form.Input
                                type="text"
                                name="additeminhoud"
                                label="Inhoud"
                                onChange={this.onChange}
                                value={additeminhoud}
                            />  
                            <Form.Field
                                control={Checkbox}
                                value={basisregel}
                                label={{ children: 'BASIS Regel' }}
                            />
                            <Form.Input 
                                type="file" 
                                id="file" 
                                name="bijlage"
                                hidden 
                                label="Upload Bijlage"
                                onChange={this.fileChangeForm} 
                            />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button primary type="submit">
                    Voeg toe <Icon name='right chevron' />
                </Button>
                </Modal.Actions>
                </Modal>

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
                { this.props.paragraven.length > 0 ?
                <Form.Input
                    control={Select}
                    type="text"
                    name="paragraaf"
                    label="Paragraaf"
                    placeholder='Kies paragraaf...'
                    onChange={this.handlePrgrfChange}
                    options={this.props.paragraven.map(paragraaf => ({key: paragraaf.id, text: paragraaf.paragraaf, value: paragraaf.id}))}
                    value={paragraaf}
                /> : <></>}
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
    isLoading: state.pveitems.isLoading,
    hoofdstukken: state.hoofdstukken.hoofdstukken,
    hoofdstukkenIsLoading: state.hoofdstukken.hoofdstukkenIsLoading,
    paragraven: state.paragraven.paragraven,
    paragravenIsLoading: state.paragraven.paragravenIsLoading,
});

export default connect(mapStateToProps, { getHoofdstukken, getParagraven, getItems, deleteItem, addItem })
(Items);
