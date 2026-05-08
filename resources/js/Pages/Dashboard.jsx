import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
    Table,
    Button,
    Input,
    Modal,
    Form,
    message,
    Popconfirm
} from 'antd';

import { useState } from 'react';

export default function Dashboard({ auth, urls }) {

    /*
    |--------------------------------------------------------------------------
    | Create URL Form
    |--------------------------------------------------------------------------
    */

    const { data, setData, post, processing, reset, errors } = useForm({
        original_url: '',
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

    /*
    |--------------------------------------------------------------------------
    | Edit Modal
    |--------------------------------------------------------------------------
    */

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUrl, setEditingUrl] = useState(null);

    const [editForm] = Form.useForm();

    const openEditModal = (record) => {
        setEditingUrl(record);

        editForm.setFieldsValue({
            original_url: record.original_url,
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

    /*
    |--------------------------------------------------------------------------
    | Delete URL
    |--------------------------------------------------------------------------
    */

    const handleDelete = (id) => {
        router.delete(route('urls.destroy', id), {
            onSuccess: () => {
                message.success('URL deleted successfully');
            }
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Table Columns
    |--------------------------------------------------------------------------
    */

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
                    <a href={shortUrl} target="_blank">
                        {shortUrl}
                    </a>
                );
            }
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">

                    <Button
                        type="primary"
                        onClick={() => openEditModal(record)}
                    >
                        Edit
                    </Button>

                    <Popconfirm
                        title="Delete URL"
                        description="Are you sure?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>
                            Delete
                        </Button>
                    </Popconfirm>

                </div>
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

                        {/* Create Form */}

                        <form
                            onSubmit={submit}
                            className="flex gap-4 mb-8"
                        >

                            <div className="w-full">
                                <Input
                                    size="large"
                                    placeholder="Enter your long URL"
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
                                htmlType="submit"
                                loading={processing}
                            >
                                Shorten
                            </Button>

                        </form>

                        {/* Table */}

                        <Table
                            columns={columns}
                            dataSource={urls}
                            rowKey="id"
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

                </Form>
            </Modal>

        </AuthenticatedLayout>
    );
}