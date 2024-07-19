import { useEffect, useState } from 'react';
import { useProfileContext } from '@/context/profileContext';
import { generate as uniqueId } from 'shortid';
import { EditOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Descriptions, Divider, Row } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { selectCurrentArtist } from '@/redux/auth/selectors';

import useLanguage from '@/locale/useLanguage';
import { FILE_BASE_URL } from '@/config/serverApiConfig';

const ArtistInfo = ({ config }) => {
  const translate = useLanguage();
  const navigate = useNavigate();
  const { profileContextAction } = useProfileContext();
  const { modal, updatePanel } = profileContextAction;
  const { ENTITY_NAME } = config;
  const currentArtist = useSelector(selectCurrentArtist);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={ENTITY_NAME}
        ghost={false}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              updatePanel.open();
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            icon={<LockOutlined />}
            onClick={() => {
              modal.open();
            }}
          >
            {translate('Update Password')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Row align="middle">
        <Col xs={{ span: 24 }} sm={{ span: 7 }} md={{ span: 5 }}>
          <Avatar
            className="last left"
            src={currentArtist?.photo ? FILE_BASE_URL + currentArtist?.photo : undefined}
            size={96}
            style={{
              color: '#f56a00',
              backgroundColor: currentArtist?.photo ? 'none' : '#fde3cf',
              boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 15px 3px',
              fontSize: '48px',
            }}
            alt={`${currentArtist?.name}`}
          >
            {currentArtist?.name.charAt(0).toUpperCase()}
          </Avatar>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 18 }}>
          <Descriptions column={1} size="middle">
            <Descriptions.Item label={translate('first name')}>
              {currentArtist?.name}
            </Descriptions.Item>
            <Descriptions.Item label={translate('last name')}>
              {currentArtist?.surname}
            </Descriptions.Item>
            <Descriptions.Item label={translate('email')}>{currentArtist?.email}</Descriptions.Item>
            <Descriptions.Item label={translate('role')}>{currentArtist?.role}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider />
      <Button
        key={`${uniqueId()}`}
        icon={<LogoutOutlined />}
        className="right"
        onClick={() => navigate('/logout')}
      >
        {translate('Logout')}
      </Button>
    </>
  );
};
export default ArtistInfo;
