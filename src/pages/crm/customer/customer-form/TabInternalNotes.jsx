import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Comment, Form, Input, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {ButtonBlue} from '~/components/public/Button';
import {isEmpty} from '~/helpers/validate';
import {useRef} from 'react';
import {useEffect} from 'react';
const {TextArea} = Input;
const {Item} = Form;
const cssClass = 'crm-customer-tab';

const TabInternalNotes = (props) => {
  const [data, setData] = useState({});
  const ref = useRef(null);
  const {internalNote, user, handleCreateInternalNote} = props;
  const {avatar} = user || {};

  useEffect(() => {
    scrollToBottom();
  }, [internalNote]);

  const scrollToBottom = () => {
    ref && ref.current.scrollIntoView({behavior: 'smooth'});
  };

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const fields = [{name: ['Message'], value: data.message}];

  const onSubmit = () => {
    scrollToBottom();
  };

  const onFinish = () => {
    handleCreateInternalNote &&
      handleCreateInternalNote(data).then(
        (results) => results && setData({message: ''}),
      );
  };

  return (
    <div className={`${cssClass} tab-internal-notes`}>
      <RowAuto>
        <ColAuto desktop={24} tablet={24}>
          <div className={`${cssClass}_message_list`}>
            {!isEmpty(internalNote) &&
              internalNote.map((item, index) => (
                <CommentBasic
                  key={index}
                  sendDate={item.sendDate}
                  message={item.message}
                  user={item.user}
                />
              ))}
            <div ref={ref}></div>
          </div>
        </ColAuto>

        <ColAuto desktop={24} tablet={24}>
          <Comment
            avatar={<Avatar src={avatar || ''} />}
            content={
              <Form
                scrollToFirstError
                onFinish={onFinish}
                fields={fields}
                className="internal-note-editor">
                <Item name={`Message`} rules={[{required: true}]}>
                  <TextArea
                    placeholder="Write something..."
                    rules={[{required: true}]}
                    rows={3}
                    value={data.message}
                    onChange={(e) => {
                      onChangeData({message: e.target.value});
                    }}
                  />
                </Item>
                <div className="internal-note-box-button">
                  <ButtonBlue
                    text="Send"
                    htmlType="submit"
                    onClick={onSubmit}
                  />
                </div>
              </Form>
            }
          />
        </ColAuto>
      </RowAuto>
    </div>
  );
};

export default withRouter(TabInternalNotes);

const CommentBasic = (props) => {
  const {user, sendDate, message} = props;
  const {firstName, lastName, avatar} = user || {};
  const fullName = firstName + ' ' + lastName;
  return (
    <Comment
      author={fullName}
      avatar={<Avatar src={avatar} alt={fullName} />}
      content={<span dangerouslySetInnerHTML={{__html: message}}></span>}
      datetime={
        <Tooltip title={moment(sendDate).format('YYYY-MM-DD HH:mm:ss')}>
          <span> - {moment(sendDate).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};
