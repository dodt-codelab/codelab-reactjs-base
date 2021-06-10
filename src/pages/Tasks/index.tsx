import React, { useState } from 'react';
import { Pagination, Button, Row } from 'antd';
import { useQuery } from 'react-query';

import styles from './styles.module.scss';
import TaskList from './TaskList';
import { getTaskList } from 'api/task';

export default function Tasks() {
  const [filter, setFilter] = useState({ skip: 0, take: 10 });

  const { data, isFetching, refetch } = useQuery(['tasks', filter], () => getTaskList(filter), {
    keepPreviousData: true,
  });

  const handlePageChange = (page: number) =>
    setFilter((oldFilter) => ({ ...oldFilter, skip: (page - 1) * oldFilter.take }));

  return (
    <div className={styles.container}>
      <Row justify="space-between">
        <h2>List of Task</h2>
        <Button onClick={() => refetch()}>Reload</Button>
      </Row>
      <TaskList loading={isFetching} tasks={data?.tasks} />
      <p />
      <Pagination total={data?.total} pageSize={filter.take} onChange={handlePageChange} showSizeChanger={false} />
    </div>
  );
}
