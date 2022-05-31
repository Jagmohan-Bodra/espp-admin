import React, {useEffect, useState} from 'react';
import {getQueryBuilder, getQueryString} from '~/helpers/queryString';
import {decode} from '~/components/craft/common/util';
import {getApprovalDetails, postApprovalLink} from '~/reduxs/approval/action';
import {getMembershipListApi} from '~/reduxs/membership/action';
import {Col, Row, Form, Space, notification} from 'antd';
import {SelectDefaultItem} from '~/components/public/FormHelpers/FormCommon';
import {ButtonBlue, ButtonDanger} from '~/components/public/Button';

const ApprovalPage = (props) => {
  const query = getQueryString(props);
  const [data, setData] = useState({});
  const [customer, setCustomer] = useState({});
  const [approve, setApprove] = useState('');
  const [reject, setReject] = useState('');
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const {token} = getQueryBuilder(query) || {};
    const {approvalId, approveLink, rejectLink} = JSON.parse(decode(token));
    setApprove(approveLink);
    setReject(rejectLink);
    getApprovalDetails(approvalId).then((data) =>
      setCustomer(data.customer || {}),
    );
    getMembershipListApi({
      meta: {
        page: 1,
        pageSize: 100000,
      },
    }).then((data) => setMemberships(data.data || []));
  }, [query]);

  const onChangeData = (value) => {
    setData({
      ...data,
      ...value,
    });
  };

  const handleApproval = () => {
    if (data.membershipId && approve) {
      postApprovalLink(approve, data).then(() =>
        notification.success({
          message: 'Approval successful',
          description: '',
          placement: 'topRight',
        }),
      );
    }
  };

  const handleReject = () => {
    if (reject) {
      postApprovalLink(reject, data);
    }
  };

  const rowData = [
    {key: 'id', value: customer._id},
    {key: 'User', value: (customer.user || {})._id},
    {key: 'Salutation', value: (customer.user || {}).salutation},
    {key: 'First Name', value: (customer.user || {}).firstName},
    {key: 'Last Name', value: (customer.user || {}).lastName},
    {key: 'Phone', value: (customer.user || {}).phone},
    {key: 'Email', value: (customer.user || {}).email},
    {key: 'Personal Email', value: customer.personalEmail},
    {key: 'Contact No', value: customer.contactNo},
    {key: 'Designation', value: customer.designation},
    {key: 'Remark', value: customer.remark},
    {
      key: 'Company Nature Of Business',
      value: customer.companyNatureOfBusiness,
    },
    {key: 'Company Fax', value: customer.companyFax},
    {key: 'Company RegNo', value: customer.companyRegNo},
    {key: 'Company Name', value: customer.companyName},
    {key: 'Finance Email', value: customer.financeEmail},
    {key: 'Finance Contact No', value: customer.financeContactNo},
    {key: 'Address Block No', value: customer.addressBlockNo},
    {key: 'Address Stresst Name', value: customer.addressStresstName},
    {key: 'Address Floor', value: customer.addressFloor},
    {key: 'Address Building Name', value: customer.addressBuildingName},
    {key: 'Address PostCode', value: customer.addressPostCode},
    {key: 'Address City', value: customer.addressCity},
    {key: 'Address State', value: customer.addressState},
    {key: 'Address Country', value: customer.addressCountry},
    {key: 'Finance Salutation', value: customer.financeSalutation},
    {key: 'Finance FirstName', value: customer.financeFirstName},
    {key: 'Finance LastName', value: customer.financeLastName},
  ];

  return (
    <div>
      <div style={{textAlign: 'center', fontSize: '24px', margin: '30px'}}>
        REGISTER CUSTOMER{' '}
      </div>
      <div className={`container`} style={{paddingBottom: '50px'}}>
        <div>
          <Form fields={[{name: ['Membership'], value: data.membershipId}]}>
            <Row>
              <Col span={12}>
                <SelectDefaultItem
                  label="Membership"
                  data={memberships}
                  onChange={(value) => {
                    onChangeData({membershipId: value});
                  }}
                  value={data.membershipId}
                  rules={[{required: true}]}
                />
              </Col>
            </Row>
            <Row>
              <Col
                span={12}
                style={{
                  textAlign: 'right',
                  marginBottom: '15px',
                  paddingRight: '70px',
                }}>
                <Space>
                  <ButtonBlue
                    htmlType={`submit`}
                    text={`Approval`}
                    onClick={handleApproval}></ButtonBlue>
                  <ButtonDanger
                    text={`Reject`}
                    onClick={handleReject}></ButtonDanger>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
        <Row
          style={{
            background: '#ececed',
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: '2.4em',
          }}>
          <Col span={12}>Field Name</Col>
          <Col span={12}>Value</Col>
        </Row>
        {rowData.map((item) => (
          <Row
            key={item.key}
            style={{
              border: '1px solid #ececed',
              lineHeight: '2.4em',
              paddingLeft: '15px',
            }}>
            <Col span={12}>{item.key}</Col>
            <Col span={12}>{item.value || ''}</Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default ApprovalPage;
