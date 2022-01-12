import React, { useState, ChangeEvent } from 'react';
import User, { IUser, Role } from './User';

const defaultData: User[] = [
  new User({
    firstName: 'Vinay',
    lastName: 'Dagar',
    middleName: '',
    email: 'vinay.dagar@sourcefuse.com',
    phone: 8988878909,
    role: Role.Subscriber,
    address: 'New Delhi',
    createdOn: new Date(),
    modifiedOn: new Date(),
  }),
  new User({
    firstName: 'Mayank',
    lastName: 'Rathi',
    middleName: '',
    email: 'mayank.rathi@sourcefuse.com',
    phone: 8988878909,
    role: Role.Subscriber,
    address: 'Gagiabad',
    createdOn: new Date(),
    modifiedOn: new Date(),
  }),
  new User({
    firstName: 'Akshat',
    lastName: 'Dubey',
    middleName: '',
    email: 'akshat.dubet@sourcefuse.com',
    phone: 8988878909,
    role: Role.Subscriber,
    address: 'Delhi',
    createdOn: new Date(),
    modifiedOn: new Date(),
  }),
  new User({
    firstName: 'Yesha',
    lastName: 'Mavani',
    middleName: '',
    email: 'yesha.mavani@sourcefuse.com',
    phone: 8988878909,
    role: Role.Subscriber,
    address: 'Noida',
    createdOn: new Date(),
    modifiedOn: new Date(),
  }),
]

const App = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [editabelRow, setEditableRow] = useState<number>();
  const [editableData, setEdiatableData] = useState<IUser>({
    firstName: '',
    email: '',
    role: Role.Admin,
  });
  const [userList, setUserList] = useState<IUser[]>(defaultData)

  const handleLoadData = () => {
    setIsLoaded(true);
    setUserList(defaultData);
  };

  const handleEditRow = (index: number) => {
    setEditableRow(index);
    setEdiatableData(userList[index]);
  }

  const handleDeleteRow = (index: number) => {
    const list = [...userList];
    list.splice(index, 1);
    setUserList(list);
  }

  const handleCancleEdit = () => {
    setEditableRow(undefined);
    setEdiatableData({
      firstName: '',
      email: '',
      role: Role.Admin,
    });
  }

  const handleRowUpdate = () => {
    if (!editableData.firstName || !editableData.role || !editableData.email) {
      return alert('First Name, Email & Role are required')
    }

    const newData = [...userList]
    newData[editabelRow as number] = editableData;

    newData[editabelRow as number].modifiedOn = new Date();

    setUserList([...newData]);

    setEditableRow(undefined);
    setEdiatableData({
      firstName: '',
      role: Role.Admin,
      email: ''
    })
    // setIsEditable(false);

  }

  const ActionButtons = (index: number) => (
    <>
      {
        editabelRow === index ? (<>
          <p onClick={handleRowUpdate} className='text-success cursor-pointer'>Save</p>
          <p onClick={handleCancleEdit} className='text-warning cursor-pointer'>Cancel</p>
        </>)
          :
          <>
            <p onClick={() => handleEditRow(index)} className='text-primary cursor-pointer'>Edit</p>
            <p onClick={() => handleDeleteRow(index)} className='text-danger cursor-pointer'>Delete</p>
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
                      <tr key={i}>
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
                              <td> {editableData?.createdOn?.toDateString() || ''} </td>
                              <td> {editableData?.modifiedOn?.toDateString() || ''} </td>
                              <td> {ActionButtons(i)} </td>
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
                            <td> {ActionButtons(i)} </td>
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
