import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';

export const columns = (deletePatient) => [
  {
    title: 'PatientId',
    dataIndex: 'patientId',
    key: 'patientId',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dob',
    key: 'dob',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 20,
    key: '',
    render: (text, record) => (
      <div className="tbl-col-action">
        <Link to={`/edit/${record.id}`}>Edit Patient</Link>
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => deletePatient(record.id)}
        >
          <Button type="link">Delete</Button>
        </Popconfirm>
      </div>
    ),
  },
];
