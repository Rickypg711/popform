// 'use client'

// import { useState, useEffect } from 'react';
// import { FaCog } from 'react-icons/fa';
// import SettModal from '../components/SettModal';

// const AdmiPage = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [filter, setFilter] = useState('all');
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             const res = await fetch('/api/users');
//             const data = await res.json();
//             setUsers(data);
//         };

//         fetchUsers();
//     }, []);

//     const toggleSelectedUser = (user) => {
//         if (selectedUsers.includes(user.id)) {
//             setSelectedUsers(selectedUsers.filter(u => u !== user.id));
//         } else {
//             setSelectedUsers([...selectedUsers, user.id]);
//         }
//     };

//     const changePaidStatus = async (paid) => {
//         for (const id of selectedUsers) {
//             const res = await fetch(`/api/users/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ paid }),
//             });

//             const updatedUser = await res.json();
//             setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
//         }
//         setSelectedUsers([]); // Clear selection
//     };

//     const deleteUser = async () => {
//         for (const id of selectedUsers) {
//             await fetch(`/api/users/${id}`, {
//                 method: 'DELETE',
//             });
//         }
//         setUsers(users.filter(u => !selectedUsers.includes(u.id)));
//         setSelectedUsers([]); // Clear selection
//     };

//     // Filter users based on the payment status
//     const filteredUsers = users.filter(user => {
//         if (filter === 'all') return true;
//         return filter === 'paid' ? user.paid : !user.paid;
//     });

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h1>S17 CORVETTE 2022</h1>
//                 <FaCog style={{ cursor: 'pointer' }} onClick={() => setIsModalVisible(!isModalVisible)} />
//             </div>

//             <div>
//                 <p>reservados: {users.length}</p>
//                 <p>pagados: {users.filter(user => user.paid).length}</p>
//                 <p>libres: 38424</p>
//             </div>
//             <div>
//                 <button onClick={() => setFilter('all')}>All</button>
//                 <button onClick={() => setFilter('paid')}>Paid</button>
//                 <button onClick={() => setFilter('notpaid')}>Not Paid</button>
//             </div>
//             <div>
//                 <button onClick={() => changePaidStatus(true)}>Mark as Paid</button>
//                 <button onClick={() => changePaidStatus(false)}>Mark as Not Paid</button>
//                 <button onClick={deleteUser}>Delete</button>
//             </div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Select</th>
//                         <th>Number</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredUsers.map(user => (
//                         <tr key={user.id} style={{ backgroundColor: user.paid ? 'green' : 'red' }}>
//                             <td>
//                                 <input 
//                                     type="checkbox" 
//                                     checked={selectedUsers.includes(user.id)}
//                                     onChange={() => toggleSelectedUser(user)}
//                                 />
//                             </td>
//                             <td>{user.numbers.join(', ')}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.phone}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {isModalVisible && 
//                 <SettModal 
//                     isVisible={isModalVisible} 
//                     onClose={() => setIsModalVisible(false)}
//                 />
//             }
//         </div>
//     );
// };

// export default AdmiPage;



'use client'


import { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import SettModal from '../components/SettModal';

const AdmiPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const toggleSelectedUser = (user) => {
        if (selectedUsers.includes(user.id)) {
            setSelectedUsers(selectedUsers.filter(u => u !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user.id]);
        }
    };

    const changePaidStatus = async (paid) => {
        for (const id of selectedUsers) {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paid }),
            });

            const updatedUser = await res.json();
            setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        }
        setSelectedUsers([]); // Clear selection
    };

    const deleteUser = async () => {
        for (const id of selectedUsers) {
            await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            });
        }
        setUsers(users.filter(u => !selectedUsers.includes(u.id)));
        setSelectedUsers([]); // Clear selection
    };

    // Filter users based on the payment status
    const filteredUsers = users.filter(user => {
        if (filter === 'all') return true;
        return filter === 'paid' ? user.paid : !user.paid;
    });

    const toUnicode = (str) => {
        return str.split('').map(function (value, index, array) {
            var temp = value.charCodeAt(0).toString(16).toUpperCase();
            if (temp.length > 2) {
                return '\\u' + temp;
            }
            return value;
        }).join('');
    }

    const sendWhatsAppReminder = () => {
        if (selectedUsers.length === 1) {
            const user = users.find(u => u.id === selectedUsers[0]);
            const message = `Hola ${user.name} te hablo de RIFAS CHIHUAHUA🔥 ...`; // rest of the message
            const unicodeMessage = toUnicode(message);
            const encodedMessage = encodeURIComponent(unicodeMessage);
            const link = `https://wa.me/${user.phone}?text=${encodedMessage}`;
            window.open(link, '_blank');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>S17 CORVETTE 2022</h1>
                <FaCog style={{ cursor: 'pointer' }} onClick={() => setIsModalVisible(!isModalVisible)} />
            </div>

            <div>
                <p>reservados: {users.length}</p>
                <p>pagados: {users.filter(user => user.paid).length}</p>
                <p>libres: 38424</p>
            </div>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('paid')}>Paid</button>
                <button onClick={() => setFilter('notpaid')}>Not Paid</button>
                <button onClick={sendWhatsAppReminder} disabled={selectedUsers.length !== 1}>
                    Send WhatsApp Reminder
                </button>
            </div>
            <div>
                <button onClick={() => changePaidStatus(true)}>Mark as Paid</button>
                <button onClick={() => changePaidStatus(false)}>Mark as Not Paid</button>
                <button onClick={deleteUser}>Delete</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id} style={{ backgroundColor: user.paid ? 'green' : 'red' }}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => toggleSelectedUser(user)}
                                />
                            </td>
                            <td>{user.numbers.join(', ')}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalVisible && 
                <SettModal 
                    isVisible={isModalVisible} 
                    onClose={() => setIsModalVisible(false)}
                />
            }
        </div>
    );
};

export default AdmiPage;