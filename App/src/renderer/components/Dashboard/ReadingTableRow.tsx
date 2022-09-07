const ReadingTableRow = () => {
  return (
    <tr>
      <th scope="row">
        <a href="/">#1</a>
      </th>
      <td className="text-secondary">Victor Muthomi</td>
      <td>Driver - KCE 227C</td>
      <td className="text-secondary">5400Kg - 80%</td>
      <td>
        <span className="badge bg-success">Approved</span>
      </td>
    </tr>
  );
};

export default ReadingTableRow;
