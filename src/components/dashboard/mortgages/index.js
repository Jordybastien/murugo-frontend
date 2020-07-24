import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exportToCsv, exportPDF } from '../../../utils/fileGenerator';
import { Tag, Button, Table } from 'antd';

class Mortgages extends Component {
  state = {
    selectedOption: null,
    filteredInfo: null,
    sortedInfo: null,
    mortgages: this.props.mortgages,
    selectedRecord: null,
    loading: false,
    modal1Visible: false,
  };

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });

    if (selectedOption.value === 'pdf') {
      const title = 'Mortgages';
      const headers = [['#', 'User Name', 'User Email', 'User Phone']];

      const data = this.state.mortgages.map((elt) => [
        elt.rowNum,
        elt.userName,
        elt.userEmail,
        elt.userPhone,
      ]);
      exportPDF(title, headers, data);
    } else {
      const CsvString = [];
      CsvString.push(['\r\n', '#', 'User Name', 'User Email', 'User Phone']);

      this.state.mortgages.map((elt) =>
        CsvString.push('\r\n', [
          elt.rowNum,
          elt.userName,
          elt.userEmail,
          elt.userPhone,
        ])
      );
      exportToCsv(CsvString);
    }
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleSearch = (e) => {
    if (e.target.value !== '') {
      const { mortgages } = this.state;
      this.setState({
        mortgages: mortgages.filter(
          (el) =>
            el.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.userEmail.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.userPhone.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      });
    } else {
      this.setState({ mortgages: this.props.mortgages });
    }
  };

  handleViewMore = (record) => {
    this.setState({ selectedRecord: record, modal1Visible: true });
  };

  render() {
    const { mortgages, selectedRecord, selectedOption, loading } = this.state;
    const { num } = this.props;

    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    const columns = [
      {
        title: '#',
        dataIndex: 'rowNum',
        key: 'rowNum',
        sorter: (a, b) => a.rowNum - b.rowNum,
        sortOrder: sortedInfo.columnKey === 'rowNum' && sortedInfo.order,
        ellipsis: true,
        width: 40,
      },
      {
        title: 'User Name',
        dataIndex: 'userName',
        key: 'userName',
        sorter: (a, b) => a.userName.length - b.userName.length,
        sortOrder: sortedInfo.columnKey === 'userName' && sortedInfo.order,
        ellipsis: true,
      },
    ];

    if (window.screen.width > 600) {
      columns.push(
        {
          title: 'User Email',
          dataIndex: 'userEmail',
          key: 'userEmail',
          ellipsis: true,
        },
        {
          title: 'User Phone',
          dataIndex: 'userPhone',
          key: 'userPhone',
          ellipsis: true,
        },
        {
          title: 'Mortgage Status',
          dataIndex: 'valid',
          key: 'valid',
          render: (valid) => {
            let color = '';
            if (valid.toLowerCase() === 'pending') {
              color = 'geekblue';
            } else if (valid.toLowerCase() === 'rejected') {
              color = 'volcano';
            } else color = 'green';
            return (
              <Tag color={color} key={valid}>
                {valid.toUpperCase()}
              </Tag>
            );
          },
        },

        {
          title: 'Requested On',
          dataIndex: 'createdOn',
          key: 'createdOn',
        }
      );
    }

    columns.push({
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => this.handleViewMore(record)}>
            More
          </Button>
        </span>
      ),
    });

    console.log('=======>', this.props.mortgages);
    return (
      <div className="dashboard-main-container">
        <div className="dashboard-top-bar flex-col-resp">
          <div className="flex-col-resp d-flex justify-content-end w-100">
            <input
              type="text"
              className="dashboard-search-txtbox mb-3"
              placeholder="Search"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header mb-3 d-flex">
            <h4 className="main-color mr-2">Mortgages</h4>
            <span className="mt-2">({num})</span>
          </div>
          <Table
            columns={columns}
            dataSource={mortgages}
            onChange={this.handleChange}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50', '100'],
              position: ['bottomCenter'],
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ mortgages }) => {
  return {
    mortgages: Object.values(mortgages).map((obj, index) => ({
      ...obj,
      key: obj._id,
      rowNum: index + 1,
      userName: `${obj.user_id.firstname} ${obj.user_id.lastname}`,
      userEmail: obj.user_id.email,
      userPhone: obj.user_id.phone,
      createdOn: obj.date.substr(0, 10),
    })),
    num: mortgages && Object.values(mortgages).length,
  };
};

export default connect(mapStateToProps)(Mortgages);
