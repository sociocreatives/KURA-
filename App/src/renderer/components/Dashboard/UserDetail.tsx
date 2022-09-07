interface PropsType {
  user: any;
  num: number;
}

const UserDetail = ({ user, num }: PropsType) => {
  return (
    <tr>
      <th scope="row">
        <a href="/">#{num}</a>
      </th>
      <td>
        {user.name} <span className=""> ({user.role})</span>
      </td>
      <td>{user.username}</td>
      <td>{user.email}</td>
    </tr>
  );
};

export default UserDetail;
