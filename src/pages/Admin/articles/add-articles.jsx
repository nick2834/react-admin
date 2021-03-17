import React, { Component } from 'react';
import { Card, Form, Input, PageHeader, TreeSelect, Button, Row, Col, Upload, message, Space, Image } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { typelist, uploadFile } from '@/api';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor'
const { Dragger } = Upload;
const { TreeNode } = TreeSelect;
export default class AddArticles extends Component {
    state = {
        editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>',
        fileList: [],
        coverImage: null
    }
    initOptions = () => {

    }
    getCategoryList = async () => {
        const result = await typelist();
        console.log(result)
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
            this.treeNodes = this.initTreeData(treeData)
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
        })
    }

    handleSelect = (value) => {
        console.log(value)
    }
    render() {
        let _this = this;
        const { editorState, coverImage } = this.state;
        const title = (
            <PageHeader style={{ padding: 0 }} onBack={() => this.props.history.goBack()} title="返回" />
        )
        const extra = (
            <Space size="middle">
                <Button type="primary">保存</Button>
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
                        console.log(response.data)
                        _this.setState({ coverImage: response.data.key })
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
                    <Form>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="文章标题" name="title" rules={[{ required: true }]} >
                                    <Input style={{ width: "90%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="副标题" name="subTttle" rules={[{ required: true }]} >
                                    <Input style={{ width: "90%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="文章分类" name="category" rules={[{ required: true }]} >
                                    <TreeSelect
                                        style={{ width: "90%" }}
                                        placeholder="请选择文章分类"
                                        multiple
                                        treeDefaultExpandAll
                                        onChange={this.handleSelect}
                                    >
                                        {this.treeNodes}
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
                        <Space>
                            <Dragger className="drag_upload" {...props}>
                                <p className="ant-upload-drag-icon">
                                    <CloudUploadOutlined />
                                </p>
                                <p className="ant-upload-text">（文章封面）将文件拖到此处，或点击上传</p>
                            </Dragger>

                            {coverImage && <div className="image-preview">
                                <Image object-fit="scaleToFill" width={"100%"} src={coverImage} />
                            </div>}
                        </Space>
                    </Form>
                </Card>
            </div>
        )
    }
}