import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Segment, Header, Button, Dropdown, Form } from 'semantic-ui-react';
import 'swiper/css';
import { fetchUsers } from '../store/actions/user';
import { registerStudentInCourse } from '../store/actions/course';

const AdminCourseRegisteration = ({
  role,
  users,
  fetchUsers,
  registerStudentInCourse,
  token,
}) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    if (role !== 'student') {
      fetchUsers(token);
    }
  }, [role, fetchUsers, token]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleStudentChange = (event, data) => {
    setSelectedStudent(data.value);
  };

  const handleRegister = () => {
    if (selectedCourse && selectedStudent) {
      registerStudentInCourse(token, selectedStudent, selectedCourse);
    }
  };

  return (
    <div>
      <Header as="h3" textAlign="center">
        Admin Course Registration
      </Header>
      <Segment>
        <Form>
          <Form.Field>
            <label>Course ID</label>
            <input
              type="text"
              placeholder="Enter Course ID"
              value={selectedCourse}
              onChange={handleCourseChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Select Student</label>
            <Dropdown
              placeholder="Select Student"
              fluid
              search
              selection
              options={users.map((user) => ({
                key: user.id,
                value: user.email,
                text: user.owner,
              }))}
              value={selectedStudent}
              onChange={handleStudentChange}
            />
          </Form.Field>
          <Button onClick={handleRegister} primary>
            Register Student
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loadingUsers: state.user.loading,
    errorUsers: state.user.error,
    users: state.user.users,
    token: state.auth.token,
    role: state.auth.role
  };
};

const mapDispatchToProps = {
  fetchUsers,
  registerStudentInCourse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCourseRegisteration);
