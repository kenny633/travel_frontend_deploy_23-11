import React, { useState } from 'react';
import { post } from "../../utils/request";

const RegisterForm = ({ onClose, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    // 简单验证
    if (password !== confirmPassword) {
      setError("密码和确认密码不匹配");
      return;
    }

    // 调用注册 API
    try {
      const res = await post("/users/Create-user", { name, username, email, password }, false);
      
      if (res.status === 200) {
        // 注册成功
        console.log('注册成功');
        // 存储返回的 token
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.data._id);
        // 传递用户信息以更新状态
        onLoginSuccess({
          username: res.data.username,
          email: res.data.email,
        });
        // 关闭注册窗口
        onClose();
      } else {
        // 注册失败
        console.log('注册失败:', res.message);
        setError(res.message);
      }
    } catch (error) {
      console.error(error);
      setError("发生错误，请稍后再试。");
    }
  };

  return (
    <div className='modalOverlay' style={styles.modalOverlay} onClick={onClose}>
      <div className='modalContent' style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>注册</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误信息 */}
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="accountName">账户名称</label>
            <input
              type="text"
              id="accountName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="email">电子邮件</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">确认密码</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>注册</button>
        </form>
      </div>
    </div>
  );
};

// 样式
const styles = {
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 半透明背景
    zIndex: 1000,
  },
  modalContent: {
    background: 'white', // 渐变背景
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '400px',
    color: 'black',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxSizing: 'border-box',
    outline: 'none',
    color: '#333',
  },
  button: {
    padding: '12px 20px',
    width: '100%',
    background: '#6e8efb',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.3s',
    margin: '10px 0',
    fontWeight: 'bold',
  },
};

// hover效果
const handleInputFocus = (e) => {
  e.target.style.borderColor = '#6e8efb';
  e.target.style.boxShadow = '0 0 5px rgba(110, 142, 251, 0.5)';
};

const handleInputBlur = (e) => {
  e.target.style.borderColor = '#ccc';
  e.target.style.boxShadow = 'none';
};

const handleButtonHover = (e) => {
  e.target.style.transform = 'scale(1.05)';
};

const handleButtonLeave = (e) => {
  e.target.style.transform = 'scale(1)';
};

export default RegisterForm;
