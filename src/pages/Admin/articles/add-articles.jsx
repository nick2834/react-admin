import React, { Component } from 'react';
import { Card, Form, Input, PageHeader, TreeSelect, Button, Row, Col, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { typelist } from '@/api';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor'

const { TreeNode } = TreeSelect;
export default class AddArticles extends Component {
    state = {
        editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>',
        fileList: []
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
        this.isLivinig = true
        // 3秒后更改编辑器内容
        setTimeout(this.setEditorContentAsync, 3000)
    }

    componentWillUnmount() {
        this.isLivinig = false
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }

    setEditorContentAsync = () => {
        this.isLivinig && this.setState({
            editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
        })
    }

    handleSelect = (value) => {
        console.log(value)
    }
    handleUploadChange = () =>{

    }
    render() {
        const { editorState, outputHTML,fileList } = this.state;
        const title = (
            <PageHeader style={{ padding: 0 }} onBack={() => this.props.history.goBack()} title="返回" />
        )
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div>
                <Card title={title}>
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
                            <Col span={24}>
                                <Form.Item label="文章封面" name="cover_image">
                                    <Upload
                                        action="http://localhost:5000/api/qiniu/upload"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleUploadChange}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="文章内容" name="content" rules={[{ required: true }]}>
                            <BraftEditor
                                className="editor"
                                value={editorState}
                                onChange={this.handleChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                    <h5>输出内容</h5>
                    <div className="output-content">{outputHTML}</div>
                </Card>
            </div>
        )
    }
}