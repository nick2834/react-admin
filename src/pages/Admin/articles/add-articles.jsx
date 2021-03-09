import React, { Component } from 'react';
import { Card, Form, Input, Cascader, PageHeader } from 'antd';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor'

export default class AddArticles extends Component {
    state = {
        editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>'
    }

    componentDidMount() {
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

    onChange = () => {

    }
    render() {
        const { editorState, outputHTML } = this.state
        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                    },
                ],
            },
        ];
        const title = (
            <PageHeader style={{ padding: 0 }} onBack={() => this.props.history.goBack()}  title="返回" />
        )
        return (
            <div>
                <Card title={title}>
                    <Form>
                        <Form.Item label="文章标题" name="title" rules={[{ required: true, message: 'Please input your username!' }]} >
                            <Input style={{ width: "500px" }} />
                        </Form.Item>
                        <Form.Item label="文章分类" name="category" rules={[{ required: true, message: 'Please input your username!' }]} >
                            <Cascader options={options} onChange={this.onChange} placeholder="Please select" style={{ width: "500px" }} />
                        </Form.Item>
                        <Form.Item label="文章内容" name="content" rules={[{ required: true }]}>
                            <BraftEditor
                                className="editor"
                                value={editorState}
                                onChange={this.handleChange}
                            />
                        </Form.Item>
                    </Form>
                    <h5>输出内容</h5>
                    <div className="output-content">{outputHTML}</div>
                </Card>
            </div>
        )
    }
}