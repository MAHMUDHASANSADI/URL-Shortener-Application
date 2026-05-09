import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
    Table,
    Button,
    Input,
    Modal,
    Form,
    message,
    Popconfirm,
    Tooltip,
    Space,
    Typography,
    Card,
    DatePicker,
    Badge,
    Tag
} from 'antd';

import {
    EditOutlined,
    DeleteOutlined,
    CopyOutlined,
    LinkOutlined,
    RocketOutlined
} from '@ant-design/icons';

const { Text } = Typography;

import { useState } from 'react';
import dayjs from 'dayjs';

export default function Dashboard({ auth, urls }) {

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        message.success('Copied to clipboard!');
    };


    const { data, setData, post, processing, reset, errors } = useForm({
        original_url: '',
        custom_code: '',
        expires_at: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('urls.store'), {
            onSuccess: () => {
                reset();
                message.success('Short URL created successfully');
            },
        });
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUrl, setEditingUrl] = useState(null);

    const [editForm] = Form.useForm();

    const openEditModal = (record) => {
        setEditingUrl(record);

        editForm.setFieldsValue({
            original_url: record.original_url,
            expires_at: record.expires_at ? dayjs(record.expires_at) : null,
        });

        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        editForm.validateFields().then((values) => {

            router.put(route('urls.update', editingUrl.id), values, {
                onSuccess: () => {
                    message.success('URL updated successfully');
                    setIsModalOpen(false);
                }
            });

        });
    };


    const handleDelete = (id) => {
        router.delete(route('urls.destroy', id), {
            onSuccess: () => {
                message.success('URL deleted successfully');
            }
        });
    };

    const columns = [
        {
            title: 'Original URL',
            dataIndex: 'original_url',
            key: 'original_url',
            render: (text) => (
                <a href={text} target="_blank">
                    {text}
                </a>
            )
        },
        {
            title: 'Short URL',
            key: 'short_url',
            render: (_, record) => {
                const shortUrl = `${window.location.origin}/s/${record.short_code}`;
                return (
                    <Space>
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                            {shortUrl}
                        </a>
                        <Tooltip title="Copy URL">
                            <Button
                                size="small"
                                type="text"
                                icon={<CopyOutlined />}
                                onClick={() => copyToClipboard(shortUrl)}
                            />
                        </Tooltip>
                    </Space>
                );
            }
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => dayjs(date).format('YYYY-MM-DD')
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            render: (clicks) => <Badge count={clicks} showZero color="#108ee9" />
        },
        {
            title: 'Expires At',
            dataIndex: 'expires_at',
            key: 'expires_at',
            render: (date) => {
                if (!date) return <Tag color="default">Never</Tag>;
                const isExpired = dayjs(date).isBefore(dayjs());
                return (
                    <Tag color={isExpired ? 'error' : 'warning'}>
                        {dayjs(date).format('YYYY-MM-DD HH:mm')}
                        {isExpired && ' (Expired)'}
                    </Tag>
                );
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => openEditModal(record)}
                        />
                    </Tooltip>

                    <Popconfirm
                        title="Delete URL"
                        description="Are you sure you want to delete this URL?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    URL Shortener Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white p-6 rounded-lg shadow">

                    <Card className="mb-8 shadow-sm border-0 bg-gray-50">
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex gap-4">
                                <div className="flex-grow">
                                    <Input
                                        size="large"
                                        prefix={<LinkOutlined className="text-gray-400" />}
                                        placeholder="Enter your long URL (e.g. https://google.com)"
                                        value={data.original_url}
                                        onChange={(e) =>
                                            setData('original_url', e.target.value)
                                        }
                                    />
                                    {errors.original_url && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.original_url}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<RocketOutlined />}
                                    htmlType="submit"
                                    loading={processing}
                                >
                                    Shorten Now
                                </Button>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Custom Short Code (Optional)"
                                        value={data.custom_code}
                                        onChange={(e) => setData('custom_code', e.target.value)}
                                        addonBefore={`${window.location.origin}/s/`}
                                    />
                                    {errors.custom_code && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.custom_code}
                                        </p>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <DatePicker
                                        showTime
                                        className="w-full"
                                        placeholder="Expiration Date (Optional)"
                                        value={data.expires_at ? dayjs(data.expires_at) : null}
                                        onChange={(date) => setData('expires_at', date ? date.format('YYYY-MM-DD HH:mm:ss') : null)}
                                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                                    />
                                    {errors.expires_at && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.expires_at}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </Card>

                        {/* Table */}

                        <Table
                            columns={columns}
                            dataSource={urls.data}
                            rowKey="id"
                            pagination={{
                                current: urls.current_page,
                                pageSize: urls.per_page,
                                total: urls.total,
                                onChange: (page) => {
                                    router.get(route('dashboard'), { page }, {
                                        preserveState: true,
                                        replace: true
                                    });
                                }
                            }}
                        />

                    </div>
                </div>
            </div>

            {/* Edit Modal */}

            <Modal
                title="Edit URL"
                open={isModalOpen}
                onOk={handleUpdate}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={editForm} layout="vertical">

                    <Form.Item
                        label="Original URL"
                        name="original_url"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter URL'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Expiration Date"
                        name="expires_at"
                    >
                        <DatePicker
                            showTime
                            className="w-full"
                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                        />
                    </Form.Item>

                </Form>
            </Modal>

        </AuthenticatedLayout>
    );
}