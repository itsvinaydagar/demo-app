import React, { useState, ChangeEvent } from 'react';
import User, { IUser, Role } from './User';
import Api from './services/api';

const App = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [api] = useState(new Api<User>());
  const [editabelRow, setEditableRow] = useState<number>();
  const [editableData, setEdiatableData] = useState<IUser>({
    firstName: '',
    email: '',
    role: Role.Admin,
  });
  const [userList, setUserList] = useState<User[]>([])

  const handleLoadData = async () => {
    try {
      setIsLoaded(true);
      const list = await api.get('users');
      setUserList(list);
    } catch (error) {
      console.log(error)
    }
  };

  const handleEditRow = (index: number) => {
    setEditableRow(index);
    setEdiatableData(userList[index]);
  }

  const handleDeleteRow = async (index: number, id: number) => {
    try {
      await api.delete('users', id);

      const list = [...userList];
      list.splice(index, 1);
      setUserList(list);
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancleEdit = () => {
    setEditableRow(undefined);
    setEdiatableData({
      firstName: '',
      email: '',
      role: Role.Admin,
    });
  }

  const handleRowUpdate = async (id: number) => {
    try {
      if (!editableData.firstName || !editableData.role || !editableData.email) {
        return alert('First Name, Email & Role are required')
      }
      await api.put('users', id, editableData);

      await handleLoadData();

      setEditableRow(undefined);
      setEdiatableData({
        firstName: '',
        role: Role.Admin,
        email: ''
      })
    } catch (err) {
      console.log(err)
    }
  }

  const ActionButtons = (index: number, id: number) => (
    <>
      {
        editabelRow === index ? (<>
          <p onClick={() => handleRowUpdate(id)} className='text-success cursor-pointer'>Save</p>
          <p onClick={handleCancleEdit} className='text-warning cursor-pointer'>Cancel</p>
        </>)
          :
          <>
            <p onClick={() => handleEditRow(index)} className='text-primary cursor-pointer'>Edit</p>
            <p onClick={() => handleDeleteRow(index, id)} className='text-danger cursor-pointer'>Delete</p>
          </>
      }
    </>
  )

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className='body main content'>
          {
            isLoaded && (
              <>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope="col" > First Name </th>
                      <th scope="col"> Middle Name </th>
                      <th scope="col"> Last Name </th>
                      <th scope="col"> Email </th>
                      <th scope="col"> Phone </th>
                      <th scope="col"> Role </th>
                      <th scope="col"> Address </th>
                      <th scope="col"> Created On </th>
                      <th scope="col"> Modified On </th>
                      <th scope="col"> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, i) => (
                      <tr key={user.id}>
                        {
                          editabelRow === i ? (
                            <> <td><input
                              type="text"
                              value={editableData?.firstName}
                              onInput={(e: ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, firstName: e.target.value })}
                            /> </td>
                              <td> <input
                                type="text"
                                value={editableData?.middleName}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, middleName: e.target.value })}
                              /></td>
                              <td><input
                                type="text"
                                value={editableData?.lastName}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, lastName: e.target.value })}
                              /></td>
                              <td><input
                                type="text"
                                value={editableData?.email}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, email: e.target.value })}
                              /></td>
                              <td> <input
                                type="text"
                                value={editableData?.phone}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, phone: +e.target.value })}
                              /></td>
                              <td>
                                <select
                                  value={Role[editableData.role]}
                                  onInput={(e: ChangeEvent<HTMLSelectElement>) => setEdiatableData({ ...editableData, role: e.target.value as Role })}>
                                  {
                                    Object.keys(Role).map((role: any) => (
                                      <option key={role} value={role}> {role} </option>
                                    ))
                                  }
                                </select>
                              </td>
                              <td><input
                                type="text"
                                value={editableData?.address}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, address: e.target.value })}
                              /> </td>
                              <td> {User.formateDate(editableData.createdOn as Date)} </td>
                              <td> {User.formateDate(editableData.modifiedOn as Date)} </td>
                              <td> {ActionButtons(i, user.id)} </td>
                            </>
                          ) : <>
                            <td> {user.firstName} </td>
                            <td> {user.middleName} </td>
                            <td> {user.lastName} </td>
                            <td> {user.email} </td>
                            <td> {user.phone} </td>
                            <td> {Role[user.role]} </td>
                            <td> {user.address} </td>
                            <td> {User.formateDate(user.createdOn as Date)} </td>
                            <td> {User.formateDate(user?.modifiedOn as Date) || ''} </td>
                            <td> {ActionButtons(i, user.id)} </td>
                          </>
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )
          }
        </div>
      </div>
      <div className="mt-5">
        <button className='btn btn-secondary' onClick={handleLoadData}> {isLoaded ? 'Refresh' : 'Load'} Data </button>
      </div>
    </div>
  );
}

export default App;