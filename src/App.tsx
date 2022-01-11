import React, { useState } from 'react';

export interface User {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phone?: number;
  role: string;
  address?: string;
  createdOn?: Date;
  modifiedOn?: Date;
}

const defaultData: User[] = [
  {
    firstName: 'Vinay',
    lastName: 'Dagar',
    middleName: '',
    email: 'vinay.dagar@sourcefuse.com',
    phone: 8988878909,
    role: 'subscriber',
    address: 'New Delhi',
    createdOn: new Date(),
    modifiedOn: new Date(),
  },
  {
    firstName: 'Mayank',
    lastName: 'Rathi',
    middleName: '',
    email: 'mayank.rathi@sourcefuse.com',
    phone: 8988878909,
    role: 'subscriber',
    address: 'Gagiabad',
    createdOn: new Date(),
    modifiedOn: new Date(),
  },
  {
    firstName: 'Akshat',
    lastName: 'Dubey',
    middleName: '',
    email: 'akshat.dubet@sourcefuse.com',
    phone: 8988878909,
    role: 'subscriber',
    address: 'Delhi',
    createdOn: new Date(),
    modifiedOn: new Date(),
  },
  {
    firstName: 'Yesha',
    lastName: 'Mavani',
    middleName: '',
    email: 'yesha.mavani@sourcefuse.com',
    phone: 8988878909,
    role: 'subscriber',
    address: 'Noida',
    createdOn: new Date(),
    modifiedOn: new Date(),
  },
]

const App = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editabelRow, setEditableRow] = useState<number>();
  const [editableData, setEdiatableData] = useState<User>({
    firstName: '',
    email: '',
    role: '',
  });
  const [userList, setUserList] = useState<User[]>(defaultData)

  const handleLoadData = () => {
    setIsLoaded(true);
    setUserList(defaultData);
  };

  const handleEditRow = (index: number) => {
    setIsEditable(true);
    setEditableRow(index);
    setEdiatableData(userList[index]);
  }

  const handleDeleteRow = (index: number) => {
    const list = [...userList];
    list.splice(index, 1);
    setUserList(list);

  }

  const handleCancleEdit = () => {
    setIsEditable(false);
    setEditableRow(undefined);
    setEdiatableData({
      firstName: '',
      email: '',
      role: '',
    });
  }

  const handleRowUpdate = () => {
    if(!editableData.firstName || !editableData.role || !editableData.email) {
     return alert('First Name, Email & Role are required')
    }

    const newData = [...userList]
    newData[editabelRow as number] = editableData;

    newData[editabelRow as number].modifiedOn = new Date();

    setUserList([...newData]);

    setEditableRow(undefined);
    setEdiatableData({
      firstName: '',
      role: '',
      email:''
    })
    setIsEditable(false);

  }

  const ActionButtons = (index: number, user: User) => (
    <>
      {
        isEditable && editabelRow === index ? (<>
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
                      <React.Fragment key={i}>
                        <tr>
                          {
                            editabelRow === i && isEditable ? (
                              <> <td><input
                                type="text"
                                value={editableData?.firstName}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, firstName: e.target.value })}
                              /> </td>
                               <td> <input
                                  type="text"
                                  value={editableData?.middleName}
                                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, middleName: e.target.value })}
                                /></td>
                                <td><input
                                  type="text"
                                  value={editableData?.lastName}
                                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, lastName: e.target.value })}
                                /></td>
                                <td><input
                                  type="text"
                                  value={editableData?.email}
                                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, email: e.target.value })}
                                /></td>
                                <td> <input
                                  type="text"
                                  value={editableData?.phone}
                                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, phone: +e.target.value })}
                                /></td>
                                <td><input
                                  type="text"
                                  value={editableData?.role}
                                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, role: e.target.value })}
                                /></td>
                                <td><input
                                  type="text"
                                  value={editableData?.address}
                                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEdiatableData({ ...editableData, address: e.target.value })}
                                /> </td>
                                <td> {editableData?.createdOn?.toDateString() || ''} </td>
                                <td> {editableData?.modifiedOn?.toDateString() || ''} </td>
                                <td> {ActionButtons(i, user)} </td>
                              </>
                            ) : <>
                              <td> {user.firstName} </td>
                              <td> {user.middleName} </td>
                              <td> {user.lastName} </td>
                              <td> {user.email} </td>
                              <td> {user.phone} </td>
                              <td> {user.role} </td>
                              <td> {user.address} </td>
                              <td> {user?.createdOn?.toLocaleString() || ''} </td>
                              <td> {user?.modifiedOn?.toLocaleString() || ''} </td>
                              <td> {ActionButtons(i, user)} </td>
                            </>
                          }
                        </tr>
                      </ React.Fragment>
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
