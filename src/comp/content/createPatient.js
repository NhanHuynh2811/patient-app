import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  notification,
  Typography,
} from 'antd';
import moment from 'moment';
import {
  createNewPatient,
  getPatient,
  updatePatient,
} from '../service/patient';
import './create_patient.scss';

const { Option } = Select;
const { Title } = Typography;
class CreatePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValuePatient: {},
      patientId: '',
      title: 'Create Patient',
    };
  }

  componentWillMount() {
    this.getSpecificationFromURL();
  }

  getSpecificationFromURL = async () => {
    const { match } = this.props;
    if (match.params.patientId) {
      const patientId = match.params.patientId;
      const patient = await getPatient(patientId);
      console.log(patient.data);
      this.setState({
        patientId: patientId,
        initialValuePatient: patient.data || {},
        title: 'Edit Patient Infomation',
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        if (!!this.state.patientId) {
          const patientReq = {
            patientId: this.state.patientId,
            data: values,
          };
          try {
            await updatePatient(patientReq);
            notification.open({
              type: 'success',
              message: 'Update Success',
            });
            const { history } = this.props;
            history.push(`/`);
          } catch (ex) {
            const { response } = ex;
            notification.open({
              type: 'error',
              message: JSON.parse(
                JSON.stringify(response.data.apierror.message)
              ),
            });
          }
        } else {
          try {
            await createNewPatient(values);
            notification.open({
              type: 'success',
              message: 'Create Success',
            });
            const { history } = this.props;
            history.push(`/`);
          } catch (ex) {
            const { response } = ex;
            notification.open({
              type: 'error',
              message: JSON.parse(
                JSON.stringify(response.data.apierror.message)
              ),
            });
          }
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { initialValuePatient, title } = this.state;
    const layout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="create-patient-container">
        <Title style={{ textAlign: 'center' }}>{title}</Title>
        <Form onSubmit={this.handleSubmit} {...layout}>
          <Form.Item label="First Name">
            {getFieldDecorator('firstName', {
              initialValue: initialValuePatient.firstName,
              rules: [
                {
                  required: true,
                  message: 'Please input first name!',
                },
              ],
            })(<Input maxLength={50} className="inp-patient" />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator('lastName', {
              initialValue: initialValuePatient.lastName,
              rules: [
                {
                  required: true,
                  message: 'Please input last name!',
                },
              ],
            })(<Input maxLength={50} className="inp-patient" />)}
          </Form.Item>
          <Form.Item label="Patient ID">
            {getFieldDecorator('patientId', {
              initialValue: initialValuePatient.patientId,
              rules: [
                {
                  required: true,
                  message: 'Please input patientID!',
                },
              ],
            })(<Input maxLength={50} className="inp-patient" />)}
          </Form.Item>
          <Form.Item label="Date of Birth">
            {getFieldDecorator('dob', {
              initialValue: moment(`${initialValuePatient.dob}`, 'YYYY-MM-DD'),
              rules: [
                {
                  required: true,
                  message: 'Please choose date of birth!',
                },
              ],
            })(<DatePicker format="YYYY/MM/DD" />)}
          </Form.Item>
          <Form.Item label="Gender">
            {getFieldDecorator('gender', {
              initialValue: initialValuePatient.gender,
              rules: [
                {
                  required: true,
                  message: 'Please choose gender!',
                },
              ],
            })(
              <Select style={{ width: '40%' }}>
                <Option value="M">M</Option>
                <Option value="F">F</Option>
                <Option value="O">O</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(withRouter(CreatePatient));
