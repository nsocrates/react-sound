import React, { PropTypes } from 'react'
import { kFormatter } from 'utils/Utils'
import LinkItem from 'components/LinkItem'

export default function StatsTable({ tableData }) {
  const dataItems = tableData.map((item, index) => (
    <td
      className="stats__table-data"
      key={`stats__data--${item.title}_${index}`}
    >
      <LinkItem
        className="stats__link"
        to={ item.pathname }
      >
        <h6 className="stats__table-data--title">
          { item.title }
        </h6>
        <h3 className="stats__table-data--value">
          { kFormatter(item.value) }
        </h3>
      </LinkItem>
    </td>
  ))

  return (
    <table className="stats">
      <tbody>
        <tr>
          { dataItems }
        </tr>
      </tbody>
    </table>
  )
}

StatsTable.propTypes = {
  tableData: PropTypes.array.isRequired
}
