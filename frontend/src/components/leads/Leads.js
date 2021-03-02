import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
import { Header, Table, Button, Icon } from 'semantic-ui-react'

export class Leads extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getLeads();
    };

    render() {
        return (
            <Fragment>
                <Header as='h2'>Leads</Header>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>E-mail</Table.HeaderCell>
                            <Table.HeaderCell>Message</Table.HeaderCell>
                            <Table.HeaderCell>Attachment</Table.HeaderCell>
                            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.leads.map(lead => (
                            <Table.Row key={lead.id}>
                                <Table.Cell>{lead.id}</Table.Cell>
                                <Table.Cell>{lead.name}</Table.Cell>
                                <Table.Cell>{lead.email}</Table.Cell>
                                <Table.Cell>{lead.message}</Table.Cell>
                                <Table.Cell>
                                    {lead.attachment ?                                     
                                        <Button as="a" href={lead.attachment} target="_blank">
                                            <Icon name='download' />
                                        </Button> : ""
                                    }
                                </Table.Cell>
                                <Table.Cell>                                
                                    <Button onClick={this.props.deleteLead.bind(this, lead.id)} color="red" icon>
                                        	<Icon name="trash alternate" />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    leads: state.leads.leads
});

export default connect(mapStateToProps, { getLeads, deleteLead })
(Leads);
