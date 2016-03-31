import React, { PropTypes } from 'react'
import { kFormatter } from 'utils/Utils'
import LinkItem from 'components/LinkItem'

export default function StatsTable({ tableData }) {
  const dataItems = tableData.map((item) => (
    <td
      className="stats__table-data"
      key={`${item.title}_${item.value}`}
    >
      <LinkItem
        className="stats__link"
        to={ item.to }
      >
        <h5 className="stats__table-data--title">
          <small>{ item.title }</small>
        </h5>
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
