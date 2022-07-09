import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import "./login.scss";
import { CaptchaGet, LoginPost, getLoginUser } from "@apis/login";
import { useNavigate } from "react-router-dom";

interface loginProps {
	name: string,
}

const LoginContent: React.FC<loginProps> = (Props) => {

	const [submitting, setSubmitting] = useState(false);
	const [imgUrl, setImgUrl] = useState(null);
	const [uuid, setUuid] = useState(null);
	const [code, setCode] = useState(null);

	const navigate = useNavigate();
	const handleGetImage = () => {
		CaptchaGet().then((res) => {
			// this.imgUrl = "data:image/jpeg;base64, " + res.img;
			// 	this.imgId = res.uuid;
			setUuid(res.uuid);
			setImgUrl("data:image/jpeg;base64, " + res.img);

		}).catch(error => {
			console.log(error);
		});
	};
	useEffect(() => {
		handleGetImage();
	}, []);

	const handleNavigate = () => {
		// navigate("/home/main?type=resource", { replace: true });
		window.location.replace("./home/main?type=resource");
	};

	const handleSetAuthority = async (token) => {
		const res = await getLoginUser({ token });
		if (res.code == 200) {
			window.localStorage.setItem('roles', `${res.roles}`);
			window.localStorage.setItem('user', `${res.user}`);
			window.localStorage.setItem('nickname', `${res.user.nickName}`);
		}
		console.log(res);
		handleNavigate();
	};

	const handleSubmit = async (values) => {
		setSubmitting(true);
		try {
			// 登录 
			const msg = await LoginPost({ ...values, uuid });
			if (msg.code == 200) {
				message.success("登录成功");
				window.localStorage.setItem('token', `${msg.token}`);
				handleSetAuthority(msg.token);
				return;
			}
		} catch (error) {
			message.error("登录失败，请重试！");
			handleGetImage();
		}
		setSubmitting(false);
	};

	return (
		<div className="login-main g-relative">
			<div className="content g-m-auto">
				<div className="mainleft">
					<div className="pic" />
				</div>
				<div className="main">
					<div>您好，欢迎登录</div>
					<div>祉数镇农业农村一张图</div>
					<Form
						name="normal_login"
						className="loginForm"
						size="large" 
						initialValues={{ autoLogin: true }}
						onFinish={async (values) => {
							handleSubmit(values);
						}}
					>
						<Form.Item
							name="username"
							rules={[{ required: true, message: '请输入账号!' }]}
						>
							<Input prefix={<UserOutlined className="loginIcon" />} placeholder="账号" />
						</Form.Item>
						<Form.Item
							name="password"
							rules={[{ required: true, message: '请输入密码!' }]}
						>
							<Input.Password
								prefix={<LockOutlined className="loginIcon" />}
								placeholder="密码"
								iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							/>
						</Form.Item>
						<Form.Item
							name="code"
							rules={[{ required: true, message: '请输入验证码!' }]}
						>	
							<div className="loginForm-verification g-flex g-ai-c" style={{}}>
								<Input placeholder="密码" style={{ width: 188 }} />
								<img src={imgUrl} alt="" onClick={handleGetImage}/>
							</div>
							
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" block loading={submitting}>
							登录
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className="footer">
				<p>Copyright © 2021-2025 浙江祉数科技有限公司 All Rights Reserved. </p>
				<p>技术支持：浙江祉数科技有限公司</p>
			</div>
		</div>
	);
};

export default LoginContent;
