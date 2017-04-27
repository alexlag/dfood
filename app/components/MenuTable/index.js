/**
*
* MenuTable
*
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromJS, List } from 'immutable';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// import { itemClick } from './actions';

const Name = styled.span`
  cursor: pointer;

  &::after {
    padding-left: 5px;
    content: '${(props) => props.complex ? 'ℂ' : ''}';
    color: red;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Th = styled.th`
  border: none;
  text-align: left;
  padding: 8px;
`;

const Td = styled.td`
  border: none;
  text-align: left;
  padding: 8px;
  min-width: 30px;
`;

const TdSection = styled.td`
  background-color: grey;
  color: white;
  border: 1px solid #ddd;
  text-align: center;
  padding: 8px;
`;

const buildEntry = (section, selected, itemClick) => (entry, idx) => Entry(section, selected, entry, idx, itemClick);

function buildEntries(items, selected, itemClick) {
  return items.reduce((ac, entries, section) =>
    ac.push(Section(section))
      .concat(entries.map(buildEntry(section, selected, itemClick))), new List());
}

function Entry(section, selected, entry, idx, itemClick) {
  const complex = entry.get('complex');
  const price = entry.get('price');
  const name = entry.get('name');
  const added = selected.includes(fromJS({ section, idx, price }));
  return (
    <Tr key={`${section}${idx}`} onClick={() => itemClick(section, idx, price)}>
      <Td>{added ? '✓' : ''}</Td>
      <Td><Name complex={complex}>{name}</Name></Td>
      <Td>{price}</Td>
    </Tr>
  );
}

function Section(section) {
  return (
    <Tr key={section} className="info">
      <TdSection colSpan="3">{section}</TdSection>
    </Tr>
  );
}

class MenuTable extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      items,
      selected,
      itemClick,
    } = this.props;

    const inner = buildEntries(items, selected, itemClick);

    return (
      <Table>
        <thead>
          <Tr>
            <Th />
            <Th><FormattedMessage {...messages.name} /></Th>
            <Th><FormattedMessage {...messages.price} /></Th>
          </Tr>
        </thead>
        <tbody>
          {inner}
        </tbody>
      </Table>
    );
  }
}

MenuTable.propTypes = {
  items: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  itemClick: PropTypes.func.isRequired,
};

export default MenuTable;
