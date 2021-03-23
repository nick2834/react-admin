import React, { Component } from 'react';
import { Card, Form, Input, PageHeader, TreeSelect, Button, Row, Col, Upload, message, Space, Image } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { typelist } from '@/api';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor'
import { addArticle } from '@/api';
const { Dragger } = Upload;
const { TreeNode } = TreeSelect;


class AddArticles extends Component {
    formRef = React.createRef();
    state = {
        editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>',
        fileList: [],
        cover_image: null
    }
    initOptions = () => {

    }
    getCategoryList = async () => {
        const result = await typelist();
        if (result.status === "0") {
            let categoryList = result.data;
            let treeData = categoryList.filter(item => item.pid === 0);
            let subCateList = categoryList.filter(item => item.pid !== 0)
            treeData.forEach(item => {
                item.children = []
                const cateFind = subCateList.filter(subItem => item.id === subItem.pid);
                if (cateFind) {
                    item.children = (cateFind)
                }
            })
            const treeDataNodes = this.initTreeData(treeData)
            this.setState({ treeDataNodes })
        }
    }
    initTreeData = (treeData) => {
        return treeData.reduce((pre, item) => {
            if (!item.children) {
                pre.push(<TreeNode value={item.id} title={item.name} key={item.id}></TreeNode>)
            } else {
                pre.push(
                    <TreeNode value={item.id} title={item.name} key={item.id}>
                        {this.initTreeData(item.children)}
                    </TreeNode>
                )

            }
            return pre
        }, [])
    }
    componentDidMount() {
        this.getCategoryList()
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        }, () => {
            this.formRef.current.setFieldsValue({
                content: this.state.outputHTML
            });
        })
    }
    handleSave = () => {
        const { users } = this.props;
        console.log(users)
        this.formRef.current
            .validateFields()
            .then(async (data) => {
                console.log(data)
                const articleData = { ...data, user_id: users.user_id }
                const result = await addArticle(articleData)
                console.log(result)
            }).catch(err => { })
    }
    handleSelect = (value) => {
        console.log(value)
        this.formRef.current.setFieldsValue({
            type_id: JSON.stringify(value)
        });
    }
    render() {
        let _this = this;
        const { editorState, cover_image, treeDataNodes } = this.state;
        const title = (
            <PageHeader style={{ padding: 0 }} onBack={() => this.props.history.goBack()} title="返回" />
        )
        const extra = (
            <Space size="middle">
                <Button type="primary" onClick={this.handleSave}>保存</Button>
                <Button type="danger">草稿</Button>
            </Space>

        )

        const props = {
            name: 'file',
            action: 'http://localhost:5000/api/qiniu/upload',
            showUploadList: false,
            maxCount: 1,
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    const { response } = info.fileList[0]
                    if (response.status === 0) {
                        _this.setState({ cover_image: response.data.key })
                        _this.formRef.current.setFieldsValue({
                            cover_image: `${response.data.key}`
                        });
                    }
                }
                if (status === 'done') {
                    message.success(`上传成功`);
                } else if (status === 'error') {
                    message.error(`上传失败`);
                }
            },
        };
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Form ref={this.formRef}>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="文章标题" name="title" rules={[{ required: true }]} >
                                    <Input style={{ width: "90%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="副标题" name="subtitle" rules={[{ required: true }]} >
                                    <Input style={{ width: "90%" }} />
                                </Form.Item>
                            </Col>
                            <Form.Item name="type_id" hidden><Input/></Form.Item>
                            <Col span={12}>
                                <Form.Item label="文章分类" name="category" rules={[{ required: true }]} >
                                    <TreeSelect
                                        treeDataSimpleMode
                                        style={{ width: "90%" }}
                                        placeholder="请选择文章分类"
                                        multiple
                                        treeDefaultExpandAll
                                        onChange={this.handleSelect}
                                    >
                                        {treeDataNodes}
                                    </TreeSelect>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="content" rules={[{ required: true }]}>
                            <BraftEditor
                                className="editor"
                                value={editorState}
                                onChange={this.handleChange}
                            />
                        </Form.Item>
                        <Form.Item name="cover_image" rules={[{ required: true }]}>
                            <Space>
                                <Dragger className="drag_upload" {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <CloudUploadOutlined />
                                    </p>
                                    <p className="ant-upload-text">（文章封面）将文件拖到此处，或点击上传</p>
                                </Dragger>

                                {cover_image && <div className="image-preview">
                                    <Image object-fit="scaleToFill" width={"100%"} src={cover_image} />
                                </div>}
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default connect(
    (state) => ({ users: state.users }),
    {}
)(AddArticles)