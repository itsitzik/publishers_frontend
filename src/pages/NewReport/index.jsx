import { Layout, Button, Drawer, Space, Table } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { CloudSyncOutlined, ImportOutlined, UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Content } = Layout;

export default function NewReport() {
  const [importTracksPanel, setImportTracksPanel] = useState(false);

  const dataTableColumns = [
    {
      title: 'No #',
      key: 'number',
    },
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'ISRC',
      key: 'isrc',
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record);
                  break;
                case 'edit':
                  handleEdit(record);
                  break;

                case 'delete':
                  handleDelete(record);
                  break;
                case 'updatePassword':
                  handleUpdatePassword(record);
                  break;

                default:
                  break;
              }
              // else if (key === '2')handleCloseTask
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];

  const closeImportTracks = () => {
    setImportTracksPanel(false);
  };

  const openImportTracks = () => {
    setImportTracksPanel(true);
  };

  const syncTracks = () => {
    // setImportTracksPanel(true);
  };

  return (
    <Content
      className="whiteBox shadow layoutPadding"
      style={{
        margin: '30px auto',
        width: '100%',
        maxWidth: '100%',
        flex: 'none',
      }}
    >
      <PageHeader
        title="New Royalties Report"
        extra={[
          <Button key="import_tracks" icon={<UploadOutlined />} onClick={openImportTracks}>
            Load performance file
          </Button>,
          <Button key="import_tracks" icon={<ImportOutlined />} onClick={openImportTracks}>
            Import tracks
          </Button>,
          <Button type="success" className="success-btn" key="save">
            Submit
          </Button>,
        ]}
      ></PageHeader>
      <Drawer
        title="Import Tracks"
        placement="right"
        onClose={closeImportTracks}
        open={importTracksPanel}
        width={450}
        extra={
          <Space>
            <Button type="primary" onClick={syncTracks} icon={<CloudSyncOutlined />}>
              Sync
            </Button>
          </Space>
        }
      ></Drawer>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        // dataSource={dataSource}
        // pagination={pagination}
        // loading={listIsLoading}
        // onChange={handelDataTableLoad}
        scroll={{ x: true }}
      />
    </Content>
  );
}
