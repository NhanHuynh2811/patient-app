import React, { Component } from 'react';
import {
  Table,
  Button,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  notification,
  Typography,
  Checkbox,
} from 'antd';
import { columns } from './tableConfig';
import { withRouter } from 'react-router-dom';
import {
  getAllPatient,
  deletePatient,
  searchPatient,
} from '../service/patient';
import './list_patient.scss';

const { Option } = Select;
const { Title } = Typography;

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getPatients();
  }

  getPatients = async () => {
    const patients = await getAllPatient();
    this.setState({
      dataSource: [...patients.data],
    });
  };

  linkToCreatePatient = () => {
    const { history } = this.props;
    history.push(`/create`);
  };

  deletePatient = async (patientId) => {
    await deletePatient(patientId);
    await this.getPatients();
    notification.open({
      type: 'success',
      message: 'Update Success',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const patients = await searchPatient(values);
      this.setState({
        dataSource: [...patients.data],
      });
    });
  };

  handleReset = () => {
    this.getPatients();
  };

  render() {
    const { dataSource } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="patients-container">
        <Title>Patients Infomation</Title>
        <Row>
          <Col span={20}>
            <Form className="div-search" onSubmit={this.handleSubmit}>
              <Form.Item label="Fisrt Name">
                {getFieldDecorator(
                  'firstName',
                  {}
                )(<Input maxLength={50} className="inp-search" />)}
              </Form.Item>
              <Form.Item label="Last Name">
                {getFieldDecorator(
                  'lastName',
                  {}
                )(<Input maxLength={50} className="inp-search" />)}
              </Form.Item>
              <Form.Item label="PatientId">
                {getFieldDecorator(
                  'patientId',
                  {}
                )(<Input maxLength={50} className="inp-search" />)}
              </Form.Item>
              <Form.Item label="Date of Birth">
                {getFieldDecorator(
                  'dob',
                  {}
                )(<DatePicker format="YYYY/MM/DD" className="inp-search" />)}
              </Form.Item>
              <Form.Item label="Gender">
                {getFieldDecorator(
                  'gender',
                  {}
                )(
                  <Select className="inp-search">
                    <Option value="M">M</Option>
                    <Option value="F">F</Option>
                    <Option value="O">O</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label="Deleted"
                style={{ width: '50px', textAlign: 'center' }}
              >
                {getFieldDecorator('deleted', {})(<Checkbox />)}
              </Form.Item>
              <Form.Item>
                <label></label>
                <Button type="primary" htmlType="submit" className="btn-search">
                  Search
                </Button>
              </Form.Item>
              <Form.Item>
                <label></label>
                <Button
                  type="primary"
                  onClick={() => this.handleReset()}
                  className="btn-search"
                >
                  All
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={4} className="col-btn">
            <Button type="primary" onClick={() => this.linkToCreatePatient()}>
              Create Patient
            </Button>
          </Col>
        </Row>

        <Table
          className="tbl-list-patients"
          dataSource={dataSource}
          columns={columns(this.deletePatient)}
          bordered
        />
      </div>
    );
  }
}
export default Form.create()(withRouter(Patients));
